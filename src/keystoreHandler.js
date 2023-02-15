const fs = require("fs")

function checkKeystore(projectPath) {
    try {
        let keystoreFile;
        keystoreFile = fs.readFileSync(`${projectPath}/keystore/password.txt`, "utf-8");
        return keystoreFile
    } catch (e) {
        return null
    }
}

module.exports = checkKeystore