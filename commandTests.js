const executeCommand = require("./command")
let onAssets_A = {
    cwd: "C:/Users/crist/Projects/Unity/unity-remote-build/Assets"
}

let onRemoteBuild_A = {
    cwd: "C:/Users/crist/Projects/Unity/unity-remote-build"
}

let onRemoteBuild_B = {
    cwd: "C:/Users/crist/Projects/Unity/remote-build"
}

async function run(){
    let res;
    console.log("creating folder in A");
    res = await executeCommand('mkdir testFolder2', onAssets_A);
    console.log(res.message);
    console.log("=========");
    
    console.log("Submitting changes to repository");
    res = await executeCommand('git add .', onRemoteBuild_A);
    console.log(res.message);
    console.log("=========");
    res = await executeCommand('git commit -m "submitting changes from node"', onRemoteBuild_A);
    console.log(res.message);
    console.log("=========");
    res = await executeCommand('git push origin main"', onRemoteBuild_A);
    console.log(res.message);
    console.log("=========");
    
    console.log("catching updates from B");
    res = await executeCommand('git pull origin main"', onRemoteBuild_B);
    console.log(res.message);
    console.log("=========");
}

run();