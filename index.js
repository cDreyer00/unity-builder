const app = require("express")();
const wait = require("cdreyer-utilities");
const bodyParser = require('body-parser');
const makeBuild = require('./src/makeBuildFromServer');
const { cloneRepo } = require("./src/gitHandler");

require("dotenv").config();
const PROJECTS_DIR = process.env.PROJECTS_DIR;
console.log(PROJECTS_DIR);

app.use(bodyParser.json());

app.post("/build", (req, res) => {
    // const { projectName } = req.body;
    const projectName = "remote-build";
    let projectDir = `${PROJECTS_DIR}/${projectName}`

    makeBuild(projectDir)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})

app.post("/clone", (req,res)=>{
    const repoURL = "https://github.com/cDreyer00/unity-build-from-server.git";
    const projectName = "remote-build";
    let projectDir = `${PROJECTS_DIR}/${projectName}`
    cloneRepo(projectDir, repoURL);
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

const repoURL = "https://gitlab.com/Kreativitas/monsters-mahj.git";
const projectName = "MOSNTERS-MAHJ";
let projectDir = `${PROJECTS_DIR}/${projectName}`
// cloneRepo(projectDir, repoURL);
makeBuild(projectDir)
.then(data => console.log(data))
.catch(err => console.log(err));