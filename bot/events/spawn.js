module.exports = (bot) => {
  bot.on('spawn', () => {
    console.log('Bot spawned in world')
    bot.chat('Я онлайн!')
  })
}