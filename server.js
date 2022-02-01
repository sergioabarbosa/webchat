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

app.use(express.static(`${__dirname}/public`));

app.use(cors());

const usersList = [];

let messages = [];

const dateTime = format(new Date(), 'dd-MM-yyy HH:mm:ss');

const getMsg = async () => {
  messages = await getMessages();
};

getMsg();

io.on('connection', async (socket) => {
  socket.emit('historyMessages', messages);
  
  socket.on('newUser', (nickname) => {
    usersList.push({ id: socket.id, nickname });
    io.emit('updateUsers', usersList);
  });

  socket.on('message', async ({ chatMessage, nickname = createString(16) }) => {
    await insertMessage({ chatMessage, nickname, dateTime });
    io.emit('message', `${dateTime} - ${nickname} - ${chatMessage}`);
    messages.push({ chatMessage, nickname, dateTime });
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
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3000, () => console.log('Ouvindo a porta 3000'));