# Overview
This is a server application that automates the build process for Unity projects. At given instructions, the server will download data from a Unity project Git repository, execute a background process to make a build, and export it to a Google Drive folder.

# Dependencies
Before running this software, make sure that you have the following dependencies installed on your machine:
    
- Unity Engine
    - you can download the [Unity hub](https://unity.com/download) and after that a unity editor inside the hub, or, install directly a [Unity Editor](https://unity.com/releases/editor/archive) version
    
- [NodeJS](https://nodejs.org/en/)

- A project in [Google Cloud](https://console.cloud.google.com/) with [Google Drive API](https://console.cloud.google.com/flows/enableapi?apiid=drive.googleapis.com) enabled

# Setup and run
1. Download this project and place it anywhere.

2. Open the terminal project folder and install the required npm dependencies: 

        `npm install`

3. Configure the .env file:
    
    - Edit the options values in the "template.env" file according to the descriptions provided above each option.

    - Rename the "template.env" file to ".env".

4. Run the server in the terminal: 
        
        `npm run start`


# Host server

1. Open the terminal and type:

        `npm install -g localtunnel`

2. In the terminal at the server folder, run:
    
    - change the port value to be the same as you set on the ".env" file
        
            `lt --port 3000`

This will provide a url that will redirect the web requests to the server running locally.