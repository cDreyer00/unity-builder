const app = require("express")();
const bodyParser = require('body-parser');
const { makeBuild, buildTargets } = require('./src/makeBuildFromServer');
const { cloneRepo, updateRepo } = require("./src/gitHandler");

require("dotenv").config();

const PROJECTS_PATH = process.env.PROJECTS_PATH;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello from server")
})

app.post("/build", async (req, res) => {
    const projectName = req.body.projectName;
    const branch = req.body.branch || "main";
    const buildTarget = req.body.buildTarget.toLowerCase();

    let projectDir = `${PROJECTS_PATH}/${projectName}`

    await updateRepo(projectDir, branch)
        .then(data => console.log(data))
        .catch(err => console.log(err));

    let bt;
    if (buildTarget == "windows") {
        bt = buildTargets.Windows;
    }
    if (buildTarget == "android") {
        bt = buildTargets.Android;
    }

    const buildRes = await makeBuild(projectDir, bt, projectName);

    if (buildRes) {
        res.send(`Build for ${bt} completed`)
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

// const repoURL = "https://gitlab.com/Kreativitas/monsters-mahj.git";
// const projectName = "MOSNTERS-MAHJ";
// let projectDir = `${PROJECTS_DIR}/${projectName}`
// // cloneRepo(projectDir, repoURL);
// makeBuild(projectDir)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));