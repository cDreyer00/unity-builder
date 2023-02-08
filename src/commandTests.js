const GitController = require("./gitController/gitController")

async function run(){
    let repoPath = process.cwd();
    let branch = "main";

    const thisRepo = new GitController({repoPath, branch});

    await thisRepo.commitItem("test", "src");
    await thisRepo.push();
    //test
}

run();