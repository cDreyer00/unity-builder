// const { spawn } = require("child_process");
const { simpleGit, SimpleGit, SimpleGitOptions } = require('simple-git');
const wait = require("cdreyer-utilities")

const options_A = {
    baseDir: `C:/Users/crist/Projects/Unity/unity-remote-build`,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const options_B = {
    baseDir: `C:/Users/crist/Projects/Unity/remote-build`,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};


async function execute() {
    let res;
    let repo = simpleGit(options_A);
    
    console.log("commiting from repo-A");
    
    res = await repo.add(".");
    res = await repo.commit("commit from nodejs");
    res = await repo.push("origin", "main");
    
    repo = simpleGit(options_B);
    console.log("pulling into repo-B");
    res = await repo.pull("origin", "main");
    
    console.log("Done");

}
execute();

async function executeCommand(command, options) {
    let res = undefined;

    await exec(command, options, (stdout, stderr, err) => {
        console.log("executing ===================");
        if (err) {
            res = {
                status: 400,
                message: err
            }
        } else if (stdout) {
            res = {
                status: 200,
                message: stdout
            }
        } else if (stderr) {
            res = {
                status: 500,
                message: stderr
            }
        }
    });

    while (!res) {
        await wait(0.1);
        console.log("loop");
        console.log(res);
        continue;
    }

    return res
}

async function run(){
    await executeCommand("git status")
    await executeCommand("git add .")
    await executeCommand('git commit -m "first commit from nodejs"')
    await executeCommand('git push origin main')
}

run();

module.exports = executeCommand;