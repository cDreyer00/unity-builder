const fs = require('fs')

const PROJECTS_PATH = process.env.PROJECTS_PATH;

async function sendLog(req, res) {
    console.log('projects requested')

    fs.readdir(PROJECTS_PATH, { withFileTypes: true }, (err, files) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        const folders = files.filter(file => file.isDirectory()).map(folder => folder.name);
        res.send(folders)
    });
}

module.exports = sendLog