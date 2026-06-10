module.exports = (bot) => {
  bot.on('death', () => {
    console.log('Bot died')
  })
}