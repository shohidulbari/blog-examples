const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// serving the html page to browser
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// listen for event's form client
io.on('connection', (socket) => {
    // listen specific named event
    socket.on('new-notice', (data) => {
        io.emit('add-to-board', data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});