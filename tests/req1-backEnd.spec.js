const io = require('socket.io-client');

const BASE_URL = 'http://localhost:3000/';

describe('1 - Back-end: Conexão simultânea de clientes e troca de mensagens em chat público', () => {
  const chatMessage = 'Só sei que nada sei.';
  const nickname = 'Sócrates';

  let client1;
  let client2;
  let client3;

  afterEach(async (done) => {
    client1.disconnect();
    client2.disconnect();
    client3.disconnect();
    done();
  });

  it('Será validado que todos os clientes que estão conectados ao chat podem enviar e receber mensagens', async (done) => {
    client1 = io.connect(BASE_URL, { reconnection: false });
    client2 = io.connect(BASE_URL, { reconnection: false });
    client3 = io.connect(BASE_URL, { reconnection: false });

    client1.emit('message', { chatMessage, nickname });
    client2.emit('message', { chatMessage, nickname });
    client3.emit('message', { chatMessage, nickname });

    client1.on('message', (message) => {
      expect(message.includes(chatMessage)).toBeTruthy();
      expect.assertions(1);
    });

    client2.on('message', (message) => {
      expect(message.includes(chatMessage)).toBeTruthy();
      expect.assertions(2);
    });

    client3.on('message', (message) => {
      expect(message.includes(chatMessage)).toBeTruthy();
      expect.assertions(3);
      done();
    });
  });
});
