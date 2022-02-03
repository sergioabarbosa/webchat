require('dotenv').config();

const puppeteer = require('puppeteer');
const _ = require('lodash');

const BASE_URL = 'http://localhost:3000/';

function dataTestid(name) {
  return `[data-testid=${name}]`;
}

const chatMessage = 'The more I study, the more insatiable do I feel my genius for it to be.';
const anotherChatMessage = 'Your best and wisest refuge from all troubles is in your science.';
const yetAnotherChatMessage = 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.';
const nickname = 'Ada Lovelace';

describe('2 - Interface de Usuário para interação dos clientes', () => {
  let browser;
  let page;

  beforeEach(async (done) => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();
    await page.goto(BASE_URL);
    done();
  });

  afterEach(async (done) => {
    await browser.close();
    done();
  });

  it('Será validado que o front-end tem um campo de texto para preencher um nome de usuário e um botão para alterar o apelido (nickname)', async () => {
    const nicknameBox = await page.$(`input${dataTestid('nickname-box')}`);
    const nicknameButton = await page.$(`button${dataTestid('nickname-button')}`);

    expect(nicknameBox).not.toBeNull();
    expect(nicknameButton).not.toBeNull();
  });

});
