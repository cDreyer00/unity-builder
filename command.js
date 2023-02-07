// const { spawn } = require("child_process");
const { simpleGit, SimpleGit, SimpleGitOptions } = require('simple-git');
const wait = require("cdreyer-utilities")

const options = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

// when setting all options in a single object
const git = simpleGit(options);

async function execute() {
    let res;
    res = await git.status();
    console.log(res);
    res = await git.add(".");
    console.log(res);
    res = await git.commit("commit from nodejs simpleGit");
    console.log(res);
    res = await git.push("origin", "main");
    console.log(res);
    //test
}
execute();

// async function executeCommand(command, options) {
//     let res = undefined;

//     await exec(command, options, (stdout, stderr, err) => {
//         console.log("executing ===================");
//         if (err) {
//             res = {
//                 status: 400,
//                 message: err
//             }
//         } else if (stdout) {
//             res = {
//                 status: 200,
//                 message: stdout
//             }
//         } else if (stderr) {
//             res = {
//                 status: 500,
//                 message: stderr
//             }
//         }
//     });

//     while (!res) {
//         await wait(0.1);
//         console.log("loop");
//         console.log(res);
//         continue;
//     }

//     return res
// }

// async function run(){
//     await executeCommand("git status")
//     await executeCommand("git add .")
//     await executeCommand('git commit -m "first commit from nodejs"')
//     await executeCommand('git push origin main')
// }

// run();

// module.exports = executeCommand;