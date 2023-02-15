using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;
using System;
using System.Collections.Generic;

public static class Build
{
    static Dictionary<string, string> lineArgs = new();

    static void SetArgsDict()
    {
        string[] args = System.Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
        {
            if(args[i] == "-keystorePassword"){
                lineArgs.Add("keystorePassword", args[i + 1]);
            }

            if(args[i] == "-buildsPath"){
                lineArgs.Add("buildsPath", args[i + 1]);
            }

            if(args[i] == "-buildName"){
                lineArgs.Add("buildName", args[i + 1]);
            }
        }
    }

    [MenuItem("Build/Windows")]
    public static void BuildWindows()
    {
        SetArgsDict();

        BuildPlayerOptions buildPlayerOptions = BuildOptions(lineArgs["buildsPath"], lineArgs["buildName"], BuildTarget.StandaloneWindows);
        ExecuteBuild(buildPlayerOptions);
    }

    [MenuItem("Build/Android")]
    public static void BuildAndroid()
    {
        SetArgsDict();
        if (PlayerSettings.Android.useCustomKeystore)
        {
            PlayerSettings.Android.keystorePass = lineArgs["keystorePassword"];
            PlayerSettings.Android.keyaliasPass = lineArgs["keystorePassword"];
        }

        BuildPlayerOptions buildPlayerOptions = BuildOptions(lineArgs["buildsPath"], lineArgs["buildName"], BuildTarget.Android);

        ExecuteBuild(buildPlayerOptions);
    }

    static void ExecuteBuild(BuildPlayerOptions buildPlayerOptions)
    {
#if UNITY_EDITOR
        BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
        if (report.summary.result == BuildResult.Succeeded)
        {
            Debug.Log("Build succeeded: " + buildPlayerOptions.locationPathName);
            EditorApplication.Exit(0);
        }
        else
        {
            Debug.LogError("Build failed");
            EditorApplication.Exit(1);
        }
#endif
    }

    static BuildPlayerOptions BuildOptions(string buildPath, string buildName, BuildTarget buildTarget)
    {
        string extension = buildTarget switch
        {
            BuildTarget.Android => "apk",
            BuildTarget.StandaloneWindows => "exe",
            _ => "exe",
        };

        string fullPath = $"{buildPath}/{buildName}.{extension}";

        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();

        buildPlayerOptions.locationPathName = fullPath;
        buildPlayerOptions.target = buildTarget;
        buildPlayerOptions.options = UnityEditor.BuildOptions.None;

        buildPlayerOptions.scenes = new string[EditorBuildSettings.scenes.Length];
        for (int i = 0; i < EditorBuildSettings.scenes.Length; i++)
        {
            buildPlayerOptions.scenes[i] = EditorBuildSettings.scenes[i].path;
        }

        return buildPlayerOptions;
    }
}