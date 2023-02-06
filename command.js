const { exec } = require("child_process");
const wait = require("cdreyer-utilities")

async function execute(command) {
    let res = undefined;

    await exec(command, (stdout, stderr, err) => {
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
        // console.log(res);
    });

    while(!res){
        await wait(0.1);
        continue;
    }

    return res
}



// async function test() {
//     const ts = await exec('git status', (err, stdout, stderr) => {
//         let res = {}

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
//         return res
//     })
//     console.log(ts.message);
// }

async function run(){
    await execute("git status")
    await execute("git add .")
    await execute('git commit -m "first commit from nodejs"')
    await execute('git push origin main')
}

run();