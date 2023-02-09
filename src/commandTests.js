const GitController = require("git-in-nodejs")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});
    const message = "commiting from the git-in-nodejs package"

    await thisRepo.commitAll(message);
    await thisRepo.push();
    //test
}

run();