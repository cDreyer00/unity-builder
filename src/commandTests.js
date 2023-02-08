const GitController = require("./gitController/gitController")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});

    await thisRepo.commitAll("commited from my own git class");

}

run();