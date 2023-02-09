// "C:\Program Files\Unity\Hub\Editor\2022.2.4f1\Editor\Unity.exe" -batchmode -projectPath ./ -executeMethod Build.BuildGame
const { spawn } = require('child_process');
const projectPath = "C:/Users/crist/my-things/projects/Unity/remote-build"

const unityProcess = spawn("C:/Program Files/Unity/Hub/Editor/2022.2.4f1/Editor/Unity.exe", ['-batchmode', '-projectPath', projectPath, '-executeMethod', 'Build.BuildGame']);

unityProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

unityProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

unityProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

//makeBuild("C:/Users/crist/my-things/projects/Unity/remote-build")