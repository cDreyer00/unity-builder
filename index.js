const app = require("express")();
const bodyParser = require('body-parser');
const { makeBuild, buildTargets } = require('./src/makeBuildFromServer');
const { cloneRepo, updateRepo } = require("./src/gitHandler");
const wait = require("cdreyer-utilities");
const uploadFile = require("./src/googleDriveHandler");

require("dotenv").config();

const PROJECTS_PATH = process.env.PROJECTS_PATH;
const BUILDS_PATH = process.env.BUILDS_PATH;

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send("server running")
})

app.post("/build", async (req, res) => {
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

})

app.post("/clone", async (req, res) => {
    const repoURL = req.body.repositoryURL;
    const projectName = req.body.projectName;
    let projectDir = `${PROJECTS_PATH}/${projectName}`
    try {
        await cloneRepo(projectDir, repoURL);
        res.send("Project added succesfully");
    } catch (e) {
        res.status(400).send(e.message);
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))