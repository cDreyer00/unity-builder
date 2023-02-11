// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath ./ -executeMethod Build.BuildGame

const { spawn, exec } = require('child_process');
const buildFileInProject = require('./buildScriptHandler');

async function makeBuild(projectPath) {
    return new Promise((resolve, reject) => {
        console.log("1");
        buildFileInProject(projectPath);
        console.log("3");

        const child = spawn("C:/Program Files/Unity/Hub/Editor/2022.2.4f1/Editor/Unity.exe", [
            '-batchmode',
            '-projectPath',
            projectPath,
            '-executeMethod',
            'Build.BuildGame'
        ]);

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