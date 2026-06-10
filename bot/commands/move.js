const { goals } = require('mineflayer-pathfinder')

module.exports = (bot, x, y, z) => {
  const goal = new goals.GoalBlock(x, y, z)
  bot.pathfinder.setGoal(goal)
}