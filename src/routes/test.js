const { json } = require('express');
const { makeBuild, buildTargets } = require('../handlers/build/buildHandler');
const { updateRepo } = require("../handlers/git/gitHandler");
const uploadFile = require("../handlers/google/googleDriveHandler");

const PROJECTS_PATH = process.env.PROJECTS_PATH;
const BUILDS_PATH = process.env.BUILDS_PATH;

async function build(req, res) {
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
