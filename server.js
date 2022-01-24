const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');
const { format } = require('date-fns');
const { insertMessage, getMessages } = require('./models/modelNewMessage');
const error = require('./middlewares/error');
const { createString } = require('./middlewares/helper');

const io = socketIo(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

app.use(cors());

const listUser = [];

io.on('connection', async (socket) => {
    const messages = await getMessages();
  socket.emit('historyMessages', messages);

  socket.on('newUser', (nickname) => {
    listUser.push({ id: socket.id, nickname });
    io.emit('newUser', listUser);
  });
    
  const timestamp = format(new Date(), 'dd-MM-yyy HH:mm:ss');

  socket.on('message', async ({ chatMessage, nickname = createString(16) }) => {
    io.emit('message', `${timestamp} - ${nickname} - ${chatMessage}`);
    await insertMessage({ chatMessage, nickname, timestamp });
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(error);

http.listen(3000, () => console.log('Ouvindo a porta 3000'));