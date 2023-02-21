require("dotenv").config();
const fs = require('fs');
const { google } = require('googleapis');

const FOLDER_ID = process.env.DRIVE_FOLDER_ID;

async function uploadFile(filePath, fileName) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './credentials.json',
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
            media: file
        })

        return response;
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = uploadFile;