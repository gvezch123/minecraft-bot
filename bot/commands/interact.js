module.exports = async (bot, username) => {
  const player = bot.players[username]
  if (!player) return

  bot.chat(`Привет ${username}!`)
}