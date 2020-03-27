const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = new express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 3;

io.on('connection', (socket) => {
  console.log('New connection');

  socket.emit('CountUpdated', count);

  socket.on('increment', () => {
    count++;
    // socket.emit('CountUpdated', count);
    io.emit('CountUpdated', count);
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
