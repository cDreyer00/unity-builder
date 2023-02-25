const GitController = require("git-in-nodejs");

async function updateRepo(projectPath, branch) {

    let repo = new GitController({ repoPath: projectPath, branch: branch });

    try {
        return await repo.pull();
    } catch (e) {
        throw new Error(e).message;
    }
}

async function cloneRepo(projectPath, projectRepoURL) {
    try {
        return await GitController.clone(projectPath, "main", projectRepoURL);
    }
    catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    cloneRepo,
    updateRepo
}