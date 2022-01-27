const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const socketIo = require('socket.io');
const { format } = require('date-fns');
const { insertMessage, getMessages } = require('./models/modelNewMessage');
const { createString } = require('./middlewares/helper');

const io = socketIo(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

app.use(cors());

const usersList = [];

const dateTime = format(new Date(), 'dd-MM-yyy HH:mm:ss');
io.on('connection', async (socket) => {
  const messages = await getMessages();
  socket.emit('historyMessages', messages);
  socket.on('newUser', (nickname) => {
    usersList.push({ id: socket.id, nickname });
    io.emit('updateUsers', usersList);
  });

  socket.on('message', async ({ chatMessage, nickname = createString(16) }) => {
    await insertMessage({ chatMessage, nickname, dateTime });
    io.emit('message', `${dateTime} - ${nickname} - ${chatMessage}`);
  });

  socket.on('disconnect', async () => {
    const users = usersList.findIndex((user) => user.id === socket.id);
    usersList.splice(users, 1);
    io.emit('updateUsers', usersList);
  });
});

io.on('connection', async (socket) => {
  socket.on('changeNick', (nickname) => {
    usersList.forEach((user) => {
      const userToEdit = user;
      if (user.id === socket.id) {
        userToEdit.nickname = nickname;
      }
    });
    io.emit('updateUsers', usersList);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => console.log('Ouvindo a porta 3000'));