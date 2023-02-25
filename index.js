require("dotenv").config();
const app = require("express")();
const bodyParser = require('body-parser');
const {build, downloadGitProject} = require("./src/apiActions.js");

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send("server running")
})

app.post("/build", build)

app.post("/clone", downloadGitProject)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))