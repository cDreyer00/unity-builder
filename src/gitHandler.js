const GitController = require("git-in-nodejs");

async function updateRepo(projectPath, branch) {
    
    let repo = new GitController({repoPath: projectPath, branch: branch});

    try{
        await repo.push();
    }catch(e){
        throw new Error(e).message;
    }
}

async function cloneRepo(projectPath, projectRepoURL) {
    try {
        await GitController.clone({projectPath, projectRepoURL});
    }
    catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    cloneRepo,
    updateRepo
}