const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const modelMessage = require('./models/message');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const messageFormat = modelMessage(chatMessage, nickname);
    io.emit('message', messageFormat);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});