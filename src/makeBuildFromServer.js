// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath ./ -executeMethod Build.BuildGame

// const projectPath = "C:/Users/crist/my-things/projects/Unity/remote-build"
// const unityProcess = spawn("C:/Program Files/Unity/Hub/Editor/2022.2.4f1/Editor/Unity.exe", ['-batchmode', '-projectPath', projectPath, '-executeMethod', 'Build.BuildGame']);

// unityProcess.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// unityProcess.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// unityProcess.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

const { spawn, exec } = require('child_process');

async function makeBuild(projectPath) {
    return new Promise((resolve, reject) => {

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

// makeBuild("C:/Users/crist/my-things/projects/Unity/remote-build")
// .then(data => console.log(data))
// .catch(err => console.log(err));

module.exports = makeBuild