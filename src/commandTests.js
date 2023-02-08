const GitController = require("./gitController/gitController")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});

    await thisRepo.commitAll("git class description updated");
    await thisRepo.push();

}

run();