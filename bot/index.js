const mineflayer = require('mineflayer')
const { pathfinder } = require('mineflayer-pathfinder')
const config = require('../config/botConfig')

let bot

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  })

  bot.loadPlugin(pathfinder)

  // Подключаем события
  require('./events/chat')(bot)
  require('./events/spawn')(bot)
  require('./events/death')(bot)

  bot.once('spawn', () => {
    console.log('Bot spawned')
  })

  // Auto-reconnect на разрыв соединения
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...')
    setTimeout(() => {
      createBot()
    }, 5000)
  })

  // Обработка ошибок
  bot.on('error', (err) => {
    console.error('Bot error:', err)
  })
}

createBot()

module.exports = bot