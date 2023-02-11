using UnityEditor;
using System.Diagnostics;

public class Build
{
    // [MenuItem("MyTools/Windows Build With Postprocess")]
    public static void BuildGame()
    {
        BuildGame("C:/Users/crist/Desktop/build-test", "Tests");
    }

    public static void BuildGame(string buildPath, string buildName)
    {
#if UNITY_EDITOR
        // Get filename.
        string path = EditorUtility.SaveFolderPanel("Choose Location of Built Game", buildPath, "");
        string[] levels = new string[] { "Assets/Scenes/SampleScene.unity" };

        // Build player.
        BuildPipeline.BuildPlayer(levels, $"{buildPath}/{buildName}.exe", BuildTarget.StandaloneWindows, BuildOptions.None);

        // Copy a file from the project folder to the build folder, alongside the built game.
        // FileUtil.CopyFileOrDirectory("Assets/Templates/Readme.txt", path + "Readme.txt");

        // Run the game (Process class from System.Diagnostics).
        // Process proc = new Process();
        // proc.StartInfo.FileName = path + "/BuiltGame.exe";
        // proc.Start();
#endif
    }

}

// using UnityEditor;
// using System.Diagnostics;
// using UnityEditor.Build.Reporting;

// public class Build
// {
//     // [MenuItem("MyTools/Windows Build With Postprocess")]
//     public static string BuildGame()
//     {
//         return BuildGame("C:/Users/crist/Desktop/buildtest", "Tests2");
//     }

//     public static string BuildGame(string buildPath, string buildName)
//     {
// #if UNITY_EDITOR
//         // Get filename.
//         BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
        
//         buildPlayerOptions.scenes = new[] { "Assets/Scenes/SampleScene.unity" };
//         buildPlayerOptions.locationPathName = buildPath;
//         buildPlayerOptions.target = BuildTarget.StandaloneWindows;
//         buildPlayerOptions.options = BuildOptions.None;

//         // string path = EditorUtility.SaveFolderPanel("Choose Loca tion of Built Game", , "");
//         // string[] levels = new string[] {  };

//         // Build player.
//         BuildPipeline.BuildPlayer(buildPlayerOptions);

//         BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
//         BuildSummary summary = report.summary;

//         if (summary.result == BuildResult.Succeeded)
//         {
//             return ("Build succeeded: " + summary.totalSize + " bytes");
//         }

//         if (summary.result == BuildResult.Failed)
//         {
//             return ("Build failed");
//         }

//         return null;
// #endif
//     }

//     // [MenuItem("Build/Build iOS")]
//     // public string MyBuild()
//     // {



//     //     BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
//     //     BuildSummary summary = report.summary;

//     //     if (summary.result == BuildResult.Succeeded)
//     //     {
//     //         return ("Build succeeded: " + summary.totalSize + " bytes");
//     //     }

//     //     if (summary.result == BuildResult.Failed)
//     //     {
//     //         return ("Build failed");
//     //     }
//     // }

// }