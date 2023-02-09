const GitController = require("git-in-nodejs")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});
    const message = "building unity project from server"

    await thisRepo.commitAll(message);
    await thisRepo.push();
    //test
}

run();