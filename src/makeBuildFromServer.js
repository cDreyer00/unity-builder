// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath "C:/Users/crist/my-things/projects/Unity/remote-build" -executeMethod Build.BuildWindows 

const { spawn, exec } = require('child_process');
const buildFileInProject = require('./buildScriptHandler');
const checkKeystore = require('./keystoreHandler');
require("dotenv").config();

async function makeBuild(projectPath, buildTarget) {
    return new Promise((resolve, reject) => {
        buildFileInProject(projectPath);
        const keystorePassword = checkKeystore(projectPath)

        let unityPath = process.env.UNITY_PATH

        const child = executeUnityProcess(unityPath, projectPath, buildTarget, keystorePassword)

        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve();
            if (buildTarget == buildTargets.Windows) {
                makeBuild("C:/Users/crist/my-things/projects/Unity/MOSNTERS-MAHJ", buildTargets.Android)
            }
        });

        child.on('error', (error) => {
            console.error(`Error: ${error}`);
            reject(error);
        });

        console.log(`making ${buildTarget} build`);
    })
};

function executeUnityProcess(unityPath, projectPath, buildTarget, keystorePassword) {
    if (keystorePassword) {
        return spawn(unityPath, [
            '-batchmode',
            '-projectPath',
            projectPath,
            "-keystorePassword",
            keystorePassword,
            '-executeMethod',
            buildTarget,
            '-logFile',
            'C:/Users/crist/Desktop/builds/log.txt',
        ]);
    }

    return spawn(unityPath, [
        '-batchmode',
        '-projectPath',
        projectPath,
        '-executeMethod',
        buildTarget,
        '-logFile',
        'C:/Users/crist/Desktop/builds/log.txt',
    ]);
}

const buildTargets = {
    Android: "Build.BuildAndroid",
    Windows: "Build.BuildWindows"
}

makeBuild("C:/Users/crist/my-things/projects/Unity/MOSNTERS-MAHJ", buildTargets.Windows)

module.exports = makeBuild