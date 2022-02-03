/**
 * @jest-environment node
 */
const cheerio = require('cheerio');
const axios = require('axios');
require('dotenv').config();
const io = require('socket.io-client');
const faker = require('faker');
const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');
const _ = require('lodash');

const BASE_URL = 'http://localhost:3000/';

function wait(time) {
  const start = Date.now();
  while (true) {
    if (Date.now() - start >= time) {
      return true;
    }
  }
}

function dataTestid(name) {
  return `[data-testid=${name}]`;
}

const chatMessage = 'The more I study, the more insatiable do I feel my genius for it to be.';
const anotherChatMessage = 'Your best and wisest refuge from all troubles is in your science.';
const yetAnotherChatMessage = 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.';
const nickname = 'Ada Lovelace';

describe('3 - Verifique se as mensagens são persistentes', () => {
  let browser;
  let page;
  let connection;
  let db;
  let client1;
  let client2;

  beforeEach(async (done) => {
    client1 = io.connect(BASE_URL, { reconnection: false });
    client2 = io.connect(BASE_URL, { reconnection: false });
    connection = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(process.env.DB_NAME);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    await db.collection('messages').deleteMany({});
    page = await browser.newPage();
    done();
  });

  afterEach(async (done) => {
    await browser.close();
    client1.disconnect();
    client2.disconnect();
    await db.collection('messages').deleteMany({});
    await connection.close();
    done();
  });

  it('Será validado que o histórico de 30 mensagens irá aparecer quando o cliente se conectar', async () => {
    const firstMessageToSend = { chatMessage: chatMessage, nickname: nickname };
    const secondMessageToSend = { chatMessage: anotherChatMessage, nickname: nickname };
    const thirdMessageToSend = { chatMessage: yetAnotherChatMessage, nickname: nickname };

    // sends lots of messages
    client1.emit('message', firstMessageToSend);
    //typing...
    wait(500)
    client1.emit('message', secondMessageToSend);
    //typing...
    wait(500)
    client1.emit('message', thirdMessageToSend);

    // connects via front-end
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid=message]');
    await page.waitForTimeout(1000);

    // peek the messages we sent
    const messages = await page.$$eval(dataTestid('message'), (nodes) => nodes.map((n) => n.innerText));
    expect(messages.length).toEqual(30);

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringMatching(chatMessage),
        expect.stringMatching(anotherChatMessage),
        expect.stringMatching(yetAnotherChatMessage),
      ])
    );

    const result = await db.collection('messages').find({}).toArray();
    const messagesDB = result.map(({ message }) => (message));
    expect(messagesDB.length).toEqual(3);

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringMatching(chatMessage),
        expect.stringMatching(anotherChatMessage),
        expect.stringMatching(yetAnotherChatMessage),
      ])
    );
  });
});
