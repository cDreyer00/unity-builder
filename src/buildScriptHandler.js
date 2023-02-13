const { match } = require("assert");
const fs = require("fs");
const fileName = 'Build.cs'
const localFilePath = `./src/build_script/${fileName}`;

const fullPathToFile = (projectPath) => `${projectPath}/Assets/Editor/${fileName}`

function buildFileInProject(projectPath) {
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
    return fs.existsSync(fullPathToFile(projectPath));
}


// check if project build file content matches with local build file content
function sameFilesContent(projectPath) {
    let localContent;
    let projectContent;

    localContent = fs.readFileSync(localFilePath, 'utf8')
    projectContent = fs.readFileSync(fullPathToFile(projectPath), 'utf8')

    return projectContent == localContent;
}

function copyFile(projectPath) {
    try {
        fs.mkdirSync(`${projectPath}/Assets/Editor`);
    } catch (e) { }
    finally {
        fs.copyFile(localFilePath, fullPathToFile(projectPath), (err) => { if (err) return console.log("ERR: ", err) });
    }
}

function removeFile(projectPath) {
    fs.unlink(fullPathToFile(projectPath), (err) => { if (err) return console.log("ERR: ", err) });
}

module.exports = buildFileInProject;