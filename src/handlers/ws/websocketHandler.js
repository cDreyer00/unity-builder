const { Server } = require("socket.io")

let io;
function initws(server) {
    if (io) {
        console.log("websocket already initialized");
        return;
    }
    const ioServer = new Server(server);
    
    ioServer.on('connection', (socket) => {
        
        console.log('a user connected');
        
        socket.on('A', (content) => {
            console.log('message content: ', content);
            ioServer.emit('B', "message very important from server")
        })
    })
    console.log("websocket initialized");
}

module.exports = initws