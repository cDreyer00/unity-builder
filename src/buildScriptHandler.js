const { match } = require("assert");
const fs = require("fs");
const fileName = 'Build.cs'
const filePath = `./src/build_script/${fileName}`;


function buildFileInProject(projectPath) {
    console.log("2");
    if (!fileExistsInProject(projectPath)) {
        console.log("file does not exist, copying");
        copyFile(projectPath);
        return;
    }

    if (!sameFilesContent(projectPath)) {
        console.log("Contents dont match, removing and adding again");
        removeFile(projectPath);
        copyFile(projectPath);
        return;
    }
    return
}

function fileExistsInProject(projectPath) {
    return fs.existsSync(`${projectPath}/${fileName}`);
}


// check if project build file content matches with local build file content
function sameFilesContent(projectPath) {
    let localContent;
    let projectContent;

    localContent = fs.readFileSync(filePath, 'utf8')
    projectContent = fs.readFileSync(`${projectPath}/${fileName}`, 'utf8')

    return projectContent == localContent;
}

function copyFile(projectPath) {
    fs.copyFile(filePath, `${projectPath}/${fileName}`, (err) => { if (err) return console.log("ERR: ", err) });
}

function removeFile(projectPath) {
    fs.unlink(`${projectPath}/${fileName}`, (err) => { if (err) return console.log("ERR: ", err) });
}

module.exports = buildFileInProject;