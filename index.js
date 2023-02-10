const app = require("express")();
const wait = require("cdreyer-utilities");
const bodyParser = require('body-parser');
const makeBuild = require('./src/makeBuildFromServer');

app.use(bodyParser.json());

// app.get("/build", async (req, res) => {
//     while (IsObjEmpty(makeBuild)) {
//         await wait(1);
//         continue;
//     }

//     res.send(makeBuild);
// })

app.post("/build", (req, res) => {
    const { build_name } = req.body;
    const current_date = new Date();

    makeBuild("C:/Users/crist/my-things/projects/Unity/remote-build")
        .then(data => console.log(data))
        .catch(err => console.log(err));
})

function IsObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))