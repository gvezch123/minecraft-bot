const mineflayer = require('mineflayer')
const { pathfinder } = require('mineflayer-pathfinder')
const config = require('../config/botConfig')
const fs = require('fs')
const path = require('path')

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
    
    // Устанавливаем скин боту
    try {
      const skinPath = path.join(__dirname, '../bot-skin.png')
      if (fs.existsSync(skinPath)) {
        const skinData = fs.readFileSync(skinPath)
        bot.setSettings({
          skinParts: {
            cape: true,
            jacket: true,
            left_sleeve: true,
            right_sleeve: true,
            left_pants: true,
            right_pants: true,
            hat: true
          }
        })
        console.log('Bot skin loaded!')
      }
    } catch (err) {
      console.log('Skin file not found or error loading skin:', err)
    }
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
