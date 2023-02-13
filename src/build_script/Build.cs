using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

public static class Build
{

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

    [MenuItem("Build/Windows")]
    public static void BuildWindows()
    {
        string buildName = "buld-windows"; 
        string buildPath = $"C:/Users/crist/Desktop/Builds/Windows/{buildName}.exe";
        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
        buildPlayerOptions.scenes = new[] { "Assets/Scenes/SampleScene.unity" };
        buildPlayerOptions.locationPathName = buildPath;
        buildPlayerOptions.target = BuildTarget.StandaloneWindows;
        buildPlayerOptions.options = BuildOptions.None;

        ExecuteBuild(buildPlayerOptions);
    }

    [MenuItem("Build/Android")]
    public static void BuildAndroid()
    {
        string buildName = "buld-android"; 
        string buildPath = $"C:/Users/crist/Desktop/Builds/Android/{buildName}.apk";
        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
        buildPlayerOptions.scenes = new[] { "Assets/Scenes/SampleScene.unity" };
        buildPlayerOptions.locationPathName = buildPath;
        buildPlayerOptions.target = BuildTarget.Android;
        buildPlayerOptions.options = BuildOptions.None;

        ExecuteBuild(buildPlayerOptions);
    }
}
