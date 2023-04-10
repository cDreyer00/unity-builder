const fs = require("fs")

function checkKeystore(projectPath) {
    try {
        let keystoreFile;
        keystoreFile = fs.readFileSync(`${projectPath}/keystore/password.txt`, "utf-8");
        console.log(keystoreFile)
        return keystoreFile
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = checkKeystore