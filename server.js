// const express = require('express')
// const app = express()
// const request = require('request')
// const dotenv = require('dotenv')


// dotenv.config()

// app.get('/:crypto', (req, res) => {
//   const crypto = req.params.crypto

//   const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`

//   request.get({
//     url: url,
//     json: true,
//     headers: {
//       'X-CMC_PRO_API_KEY': process.env.API_KEY
//     }}, (error, response, data) => {
//       if(error) {
//         return res.send({error:error})
//       }

//       res.send({price: data.data[crypto].quote.USD.price})
//     }

//   )
// })

// app.listen(3000, () => {
//   console.log('Server listening on port 3000')
// })


// const axios = require('axios');
// let response = null;

// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
//       headers: {
//         'X-CMC_PRO_API_KEY': 'eeadafc0-83f2-4ace-852c-72dec357ac0b',
//       },
//     });
//   } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data.data[crypto];
//     console.log(json);
//     resolve(json);
//   }
// });
const TelegramApi = require('node-telegram-bot-api')

const token = '7015802428:AAEYgX4VPA3bznvt-fkKVujbdHS-OnxOE10'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
  {command: '/list', description: 'Посмотреть список криптовалют'}
])

bot.on('message', async (msg) => {
  const text = msg.text
  const chatId = msg.chat.id
  
  if (text === '/start') {
    await bot.sendMessage(chatId, 'Добро пожаловать в бот для отслеживания курса криптовалют')
  }
  if (text === '/list') {
    await bot.sendMessage(chatId,)
  }
})