const { Server } = require("socket.io")

function initws(server) {
    const ioServer = new Server(server);
 
    ioServer.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('A', (content) => {
            console.log('message content: ', content);
            ioServer.emit('B', "message very important from server")
        })
    })
}

module.exports = initws