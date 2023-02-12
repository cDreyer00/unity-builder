const GitController = require("git-in-nodejs");

async function repoHandler(projectPath){
    // const projectRepo = new GitController({repoPath: projectPath, branch: 'main'})

    // projectPath
}

async function cloneRepo(projectPath, projectRepoURL){
    console.log("============== CLONING ==============");
    const repo = await GitController.clone(projectPath, projectRepoURL);
    console.log("============== DONE ==============");
    console.log(repo);
}


module.exports = {
    cloneRepo,
    repoHandler
}