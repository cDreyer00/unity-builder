// dependencies
require("dotenv").config();
const express = require("express");
const { createServer } = require("http")
const { Server } = require("socket.io")

// import routes
const build = require("./src/routes/build");
const clone = require("./src/routes/clone");
// const test = require("./src/routes/test");

const app = express();
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    res.send("server running")
})
app.post("/build", build)
app.post("/clone", clone)
// app.post("/test", test)

const server = createServer(app);
const ioServer = new Server(server);

ioServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('A', (content) => {
        console.log('message content: ', content);
        ioServer.emit('B', "message very important from server")
    })
})


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))


// socket client