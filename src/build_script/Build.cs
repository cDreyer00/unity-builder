using UnityEditor;
using UnityEngine;
using UnityEditor.Build.Reporting;
public class Build
{
    // [MenuItem("MyTools/Windows Build With Postprocess")]
    public static void BuildGame()
    {
        BuildGame("C:/Users/crist/Desktop/build-test", "Tests");
    }

    public static void BuildGame(string buildPath, string buildName)
    {
        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
        buildPlayerOptions.scenes = new[] { "Assets/Scene/SampleScene" };
        buildPlayerOptions.locationPathName = "test-build-remote";
        buildPlayerOptions.target = BuildTarget.StandaloneWindows;
        buildPlayerOptions.options = BuildOptions.None;

        BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
        BuildSummary summary = report.summary;

        if (summary.result == BuildResult.Succeeded)
        {
            Debug.Log("Build succeeded: " + summary.totalSize + " bytes");
        }

        if (summary.result == BuildResult.Failed)
        {
            Debug.Log("Build failed");
        }

        Debug.Log("Bulding");
    }

}