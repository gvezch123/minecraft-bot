module.exports = async (bot, blockName, count = 10) => {
  const block = bot.registry.blocksByName[blockName]
  if (!block) return console.log('Unknown block')

  for (let i = 0; i < count; i++) {
    const ref = bot.blockAt(bot.entity.position.offset(i, 0, 0))
    await bot.placeBlock(ref, { x: 0, y: 1, z: 0 })
  }
}