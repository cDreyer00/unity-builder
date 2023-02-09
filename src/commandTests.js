const GitController = require("./gitController/gitController")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});
    const message = "message var added"

    await thisRepo.commitAll(message);
    await thisRepo.push();
    //test
}

run();