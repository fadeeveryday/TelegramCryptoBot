const axios = require('axios');
const e = require('express');
let response = null;
let json = null;

new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': 'eeadafc0-83f2-4ace-852c-72dec357ac0b',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    json = response.data;
    
    resolve(json)
  }
});

const TelegramApi = require('node-telegram-bot-api')

const token = '7015802428:AAEYgX4VPA3bznvt-fkKVujbdHS-OnxOE10'

const cryptoKeys = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Bitcoin', callback_data: 1}],
      [{text: 'Ethereum', callback_data: 1027}],
      [{text: 'Solana', callback_data: 5426}],
      [{text: 'Dogecoin', callback_data: 74}],
      [{text: 'Toncoin', callback_data: 11419}],
      [{text: 'XRP', callback_data: 52}],
      [{text: 'Jupiter', callback_data: 29210}],
      [{text: 'Neo', callback_data: 1376}],
      [{text: 'EOS', callback_data: 1765}],
      [{text: 'Pyth Network', callback_data: 28177}],
    ]
  })
}

const bot = new TelegramApi(token, {polling: true})

const start = () => {
  bot.setMyCommands([
    {command: '/list', description: 'Посмотреть список криптовалют'},
    {command: '/restart', description: 'Перезапустить бота'},
  ])
  
  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    
    if (text === '/start' || text === '/restart') {
      return bot.sendMessage(chatId, 'Добро пожаловать в бот для отслеживания курса криптовалют')
    }
    if (text === '/list') {
      return bot.sendMessage(chatId, 'Выберите криптовалюту', cryptoKeys)

    }
    return bot.sendMessage(chatId, 'Неизвестная команда')
  })

  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id
    let name = null
    let price = 0
    json.data.forEach(element => {
      if(element.id == msg.data) {
        name = element.name
        price = (element.quote.USD.price).toFixed(4)
      }
    })

    await bot.sendMessage(chatId, `Вы выбрали ${name}, стоимость на данный момент ${price}$`)
  })
}
start()