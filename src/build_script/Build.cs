using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

public static class Build
{
    [MenuItem("Build/Windows")]
    public static void BuildWindows()
    {
        BuildPlayerOptions buildPlayerOptions = BuildOptions("C:/Users/crist/Desktop/builds/Windows", "test-build", BuildTarget.Android);
        ExecuteBuild(buildPlayerOptions);
    }

    [MenuItem("Build/Android")]
    public static void BuildAndroid()
    {
        if (PlayerSettings.Android.useCustomKeystore)
        {
            PlayerSettings.Android.keystorePass = "MahjongMonsterArena@1";
            PlayerSettings.Android.keyaliasPass = "MahjongMonsterArena@1";
        }

        BuildPlayerOptions buildPlayerOptions = BuildOptions("C:/Users/crist/Desktop/builds/Android", "test-build", BuildTarget.Android);

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

        string fullPath = $"${buildPath}/{buildName}.{extension}";

        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();

        buildPlayerOptions.locationPathName = buildPath;
        buildPlayerOptions.target = buildTarget;

        buildPlayerOptions.scenes = new string[EditorBuildSettings.scenes.Length];
        for (int i = 0; i < EditorBuildSettings.scenes.Length; i++)
        {
            buildPlayerOptions.scenes[i] = EditorBuildSettings.scenes[i].path;
        }

        return buildPlayerOptions;
    }
}
