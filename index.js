const app = require("express")();
const wait = require("cdreyer-utilities");
const bodyParser = require('body-parser');

let makeBuild = {};

app.use(bodyParser.json());

app.get("/build", async (req, res)=>{
    while(IsObjEmpty(makeBuild)){
        await wait(1);
        continue;
    }

    res.send(makeBuild);
})

app.post("/build", (req, res)=>{
    const {build_name} = req.body;
    const current_date = new Date();

    makeBuild = {
        build_name,
        current_date
    }

    res.send("making build");
})

function IsObjEmpty(obj){
    return Object.keys(obj).length === 0;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))