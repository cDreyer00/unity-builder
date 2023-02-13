// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath "C:/Users/crist/my-things/projects/Unity/remote-build" -executeMethod Build.BuildWindows 

const { spawn, exec } = require('child_process');
const buildFileInProject = require('./buildScriptHandler');
require("dotenv").config();

async function makeBuild(projectPath) {
    return new Promise((resolve, reject) => {
        buildFileInProject(projectPath);

        let unityPath = process.env.UNITY_PATH
        let buildTargets = ["Build.BuildWindows", "Build.BuildAndroid"]

        // === WITH SCRIPT FILE ===
        const child = spawn(unityPath, [
            '-batchmode',
            '-projectPath',
            projectPath,
            '-executeMethod',
            buildTargets[0]
        ]);

        // === WITH COMMANDS ONLY ===
        // let buildTarget = "Android"
        // const child = spawn(unityPath, [
        //     '-batchmode',
        //     '-projectPath',
        //     projectPath,
        //     '-buildTarget',
        //     buildTarget,
        //     'C:/Users/crist/Desktop'
        // ]);


        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
        });

        child.on('error', (error) => {
            console.error(`Error: ${error}`);
            reject(error);
        });

        console.log("making build");
    })
};

module.exports = makeBuild

makeBuild("C:/Users/crist/Desktop/Kreativitas/Projetos/store-cards-and-packs")