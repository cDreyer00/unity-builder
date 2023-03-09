// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath "C:/Users/crist/my-things/projects/Unity/remote-build" -executeMethod Build.BuildWindows 
require("dotenv").config();
const { spawn, exec } = require('child_process');
const buildFileInProject = require('./buildFileHandler');
const checkKeystore = require('./keystoreHandler');

const LOG_PATH = process.env.LOG_PATH + "/log.txt";
const BUILDS_PATH = process.env.BUILDS_PATH;
const unityPath = process.env.UNITY_PATH

async function makeBuild(projectPath, buildTarget, projectName) {
    return new Promise((resolve, reject) => {
        buildFileInProject(projectPath);

        const keystorePassword = checkKeystore(projectPath)


        const {process, buildName} = executeUnityProcess(unityPath, projectPath, projectName, buildTarget, keystorePassword)

        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        process.on('close', (code) => {
            if (code == 0) {
                const data = {
                    buildPath: `${BUILDS_PATH}/${buildName}`,
                    buildName
                }

                resolve(data);
            }
            else {
                reject();
            }
        });

        process.on('error', (error) => {
            console.error(`Error: ${error}`);
            reject();
        });


        console.log("building");
    })
};


function executeUnityProcess(unityPath, projectPath, projectName, buildTarget, keystorePassword) {

    const curDate = new Date();
    const date = {
        year: curDate.getFullYear(),
        month: curDate.getMonth() + 1,
        day: curDate.getDate(),
        hours: curDate.getHours(),
        minutes: curDate.getMinutes()
    };

    let buildName = `${projectName}_${date.year}${date.month}${date.day}`
    let process;

    if (keystorePassword) {
        process = spawn(unityPath, [
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
        ])
    }
    else {
        process = spawn(unityPath, [
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
        ])
    }

    return {
        process,
        buildName,
    }
}


const buildTargets = {
    Android: "Build.BuildAndroid",
    Windows: "Build.BuildWindows"
}

module.exports = {
    makeBuild,
    buildTargets
}