const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = new express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New connection');

  socket.emit('message', 'Welcome');

  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('sendMessage', (val, callback) => {
    filter = new Filter();

    if(filter.isProfane(val)){
      return callback("Profanity is not allowed");
    }

    io.emit('message', `serverside:${val}`);
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    // socket.broadcast.emit('message', coordinates);
    // console.log(coordinates);
    io.emit('message', `https://google.com/maps/?q=${latitude},${longitude}`);

     callback('Location shared')
  });

  socket.on('disconnect', () => {
    io.emit('message', 'User has left');
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
