const { cloneRepo } = require("../handlers/git/gitHandler");

const PROJECTS_PATH = process.env.PROJECTS_PATH;

async function downloadGitProject(req, res) {
    const repoURL = req.body.repositoryURL;
    const projectName = req.body.projectName;

    let projectDir = `${PROJECTS_PATH}/${projectName}`

    try {
        await cloneRepo(projectDir, repoURL);
        res.send("Project added succesfully");
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = downloadGitProject