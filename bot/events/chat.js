module.exports = (bot) => {
  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    const args = message.split(' ')

    if (message === 'привет бот') {
      bot.chat(`Привет, ${username}!`)
    }

    if (args[0] === '!say') {
      bot.chat(args.slice(1).join(' '))
    }

    if (args[0] === '!jump') {
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)
    }
  })
}