const app = require("express")();
const wait = require("cdreyer-utilities");
const bodyParser = require('body-parser');
const makeBuild = require('./src/makeBuildFromServer');

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

function IsObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))