require("dotenv").config();
const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = process.env.DRIVE_FOLDER_ID;
const GCAPI_KEY_PATH = process.env.GCAPI_KEY_PATH;

function uploadFile(filePath, fileName) {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: GCAPI_KEY_PATH,
                scopes: ['https://www.googleapis.com/auth/drive']
            })

            const driveService = google.drive({
                version: "v3",
                auth
            })

            const metaData = {
                'name': fileName,
                'parents': [FOLDER_ID]
            }

            const file = {
                body: fs.createReadStream(filePath)
            }

            const response = await driveService.files.create({
                resource: metaData,
                media: file,
            })
            
            resolve(response);
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

module.exports = uploadFile;