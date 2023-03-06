const { makeBuild, buildTargets } = require('../handlers/buildHandler');
const { updateRepo } = require("../handlers/gitHandler");
const uploadFile = require("../handlers/googleDriveHandler");

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
        let buildName = `${buildRes.buildName}.${fileType}`;
        let buildPath = `${BUILDS_PATH}/${buildName}`
        await uploadFile(buildPath, buildName);

        return res.send("build completed and uploaded to drive");
    }
    catch (err) {
        return res.status(500).send(err.message)
    }

}

module.exports = build
