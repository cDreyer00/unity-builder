const { json } = require('express');
const { makeBuild, buildTargets } = require('../handlers/build/buildHandler');
const { updateRepo } = require("../handlers/git/gitHandler");
const uploadFile = require("../handlers/google/googleDriveHandler");

const PROJECTS_PATH = process.env.PROJECTS_PATH;
const BUILDS_PATH = process.env.BUILDS_PATH;

async function build(req, res) {
    // catch request informations
    let projectName = req.body.projectName;
    let branch = req.body.branch || "main";
    let buildTarget = req.body.buildTarget;
    if (!buildTarget || !projectName || !branch) {
        return res.status(400).send('Need at least "projectName" and "buildTarget"')
    }

    buildTarget = req.body.buildTarget.toLowerCase();

    // check for updates in local repository
    let projectDir = `${PROJECTS_PATH}/${projectName}`;
    try {
        await updateRepo(projectDir, branch);
    } catch (err) {
        return res.status(500).send(err.message)
    }

    let bt;
    if (buildTarget == "windows") {
        bt = buildTargets.Windows;
    }
    if (buildTarget == "android") {
        bt = buildTargets.Android;
    }

    if (!bt) {
        return res.status(400).send("build target not provided")
    }

    // executes build
    let buildRes;
    try {
        buildRes = await makeBuild(projectDir, bt, projectName);
    } catch (e) {
        return res.status(500).send(`Something went wrong during the build process, see the log for more information`);
    }
    console.log("build done and succeeded");

    // upload build to drive
    try {
        let fileType = bt == buildTargets.Android ? 'apk' : '';

        console.log("FILE TYPE:", fileType);
        console.log("BT:", bt);

        let buildName = `${buildRes.buildName}.${fileType}`;
        let buildPath = `${BUILDS_PATH}/${buildName}`;

        await uploadFile(buildPath, buildName);
        return res.send("Build completed and uploaded to drive");
    } catch (err) {
        return res.status(500).send("could not upload the build to drive");
    }
}

module.exports = build;
