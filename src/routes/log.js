const { cloneRepo } = require("../handlers/git/gitHandler");

const LOG_PATH = process.env.LOG_PATH;

async function sendLog(req, res) {
    console.log('log requested')
    try {
        const file = `${LOG_PATH}/log.txt`;
        
        res.sendFile(file);
        res.attachment(file);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = sendLog