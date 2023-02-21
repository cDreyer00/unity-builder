// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath "C:/Users/crist/my-things/projects/Unity/remote-build" -executeMethod Build.BuildWindows 

const { spawn, exec } = require('child_process');
const buildFileInProject = require('./buildFiletHandler');
const checkKeystore = require('./keystoreHandler');
require("dotenv").config();

const LOG_PATH = process.env.LOG_PATH + "/log.txt";
const BUILDS_PATH = process.env.BUILDS_PATH;

async function makeBuild(projectPath, buildTarget, projectName) {
    return new Promise((resolve, reject) => {
        buildFileInProject(projectPath);

        const keystorePassword = checkKeystore(projectPath)

        let unityPath = process.env.UNITY_PATH

        const child = executeUnityProcess(unityPath, projectPath, projectName, buildTarget, keystorePassword)

        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            if (code == 0) {
                //TODO: retrieve important data from de buld (name, plataform...) 
                resolve(true);
            }
            else{
                reject(false);
            }
        });

        child.on('error', (error) => {
            console.error(`Error: ${error}`);
            reject(false);
        });


        console.log("building");
    })
};

function executeUnityProcess(unityPath, projectPath, projectName, buildTarget, keystorePassword) {
    console.log(buildTarget);
    // let buildName = buildTarget == buildTargets.Android ? `${projectName}` : `${projectName}`
    let buildName = projectName;

    if (keystorePassword) {
        return spawn(unityPath, [
            '-batchmode',
            '-projectPath',
            projectPath,
            '-executeMethod',
            buildTarget,
            '-logFile',
            LOG_PATH,
            '-buildsPath',
            BUILDS_PATH,
            '-buildName',
            buildName,
            "-keystorePassword",
            keystorePassword,
        ]);
    }

    return spawn(unityPath, [
        '-batchmode',
        '-projectPath',
        projectPath,
        '-executeMethod',
        buildTarget,
        '-logFile',
        LOG_PATH,
        '-buildsPath',
        BUILDS_PATH,
        '-buildName',
        buildName,
    ]);
}

const buildTargets = {
    Android: "Build.BuildAndroid",
    Windows: "Build.BuildWindows"
}

module.exports = {
    makeBuild,
    buildTargets
}