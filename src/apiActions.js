require("dotenv").config();
const { makeBuild, buildTargets } = require('./handlers/buildHandler');
const { cloneRepo, updateRepo } = require("./handlers/gitHandler");
const wait = require("cdreyer-utilities");
const uploadFile = require("./handlers/googleDriveHandler");

const PROJECTS_PATH = process.env.PROJECTS_PATH;
const BUILDS_PATH = process.env.BUILDS_PATH;

async function build(req, res) {
    const projectName = req.body.projectName;
    const branch = req.body.branch || "main";
    const buildTarget = req.body.buildTarget.toLowerCase();

    let projectDir = `${PROJECTS_PATH}/${projectName}`

    try {
        await updateRepo(projectDir, branch);
    } catch (err) {
        return res.status(500).send(err.message);
    }

    let bt;
    if (buildTarget == "windows") {
        bt = buildTargets.Windows;
    }
    if (buildTarget == "android") {
        bt = buildTargets.Android;
    }

    const buildRes = await makeBuild(projectDir, bt, projectName);

    if (!buildRes) {
        return res.status(500).send(`something went wrong during the build process, see the log for more informations`)
    }

    try {
        // TODO: change the buildpPath to be the buildRes.buildPath retrieved data
        let buildPath = `${BUILDS_PATH}/${projectName}.apk`
        await uploadFile(buildPath, projectName + '.apk');

        return res.send("build completed and uploaded to drive");
    }
    catch (err) {
        return res.status(500).send(err.message)
    }

}

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


module.exports = {
    build,
    downloadGitProject
}