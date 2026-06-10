const express = require('express')
const router = express.Router()
const bot = require('../../bot')

const { goals } = require('mineflayer-pathfinder')

/*
ЧАТ
*/
router.post('/chat', (req, res) => {

  const { message } = req.body

  if (!message) {
    return res.status(400).send('No message')
  }

  try {
    bot.chat(message)
    res.send({
      status: 'ok'
    })
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).send(err.message)
  }
})

/*
ПЕРЕМЕЩЕНИЕ К КООРДИНАТАМ
*/
router.post('/move', (req, res) => {

  const { x, y, z } = req.body

  if (x === undefined || y === undefined || z === undefined) {
    return res.status(400).send('Invalid coords')
  }

  try {
    bot.pathfinder.setGoal(
      new goals.GoalBlock(
        Number(x),
        Number(y),
        Number(z)
      )
    )
    res.send({
      status: 'moving'
    })
  } catch (err) {
    console.error('Move error:', err)
    res.status(500).send(err.message)
  }
})

/*
W A S D SHIFT SPACE
*/
router.post('/control', (req, res) => {

  const { key, state } = req.body

  if (!key) {
    return res.status(400).send('No key')
  }

  try {
    // Check if bot is spawned
    if (!bot.entity) {
      return res.status(400).send('Bot not spawned yet')
    }

    // Map key names to mineflayer control states
    const keyMap = {
      'forward': 'forward',
      'back': 'back',
      'left': 'left',
      'right': 'right',
      'jump': 'jump',
      'sneak': 'sneak'
    }

    const controlKey = keyMap[key]
    if (!controlKey) {
      return res.status(400).send('Invalid key: ' + key)
    }

    bot.setControlState(controlKey, Boolean(state))

    res.send({
      status: 'ok'
    })

  } catch (err) {
    console.error('Control error:', err)
    res.status(500).send(err.message)
  }
})

/*
ВРАЩЕНИЕ ГОЛОВЫ
*/
router.post('/head', (req, res) => {

  const { direction } = req.body

  if (!direction) {
    return res.status(400).send('No direction')
  }

  try {
    // Check if bot is spawned
    if (!bot.entity) {
      return res.status(400).send('Bot not spawned yet')
    }

    const rotationSpeed = 0.1

    switch(direction) {
      case 'up':
        bot.look(bot.entity.yaw, bot.entity.pitch - rotationSpeed, false)
        break
      case 'down':
        bot.look(bot.entity.yaw, bot.entity.pitch + rotationSpeed, false)
        break
      case 'left':
        bot.look(bot.entity.yaw + rotationSpeed, bot.entity.pitch, false)
        break
      case 'right':
        bot.look(bot.entity.yaw - rotationSpeed, bot.entity.pitch, false)
        break
      default:
        return res.status(400).send('Invalid direction: ' + direction)
    }

    res.send({
      status: 'ok'
    })

  } catch (err) {
    console.error('Head error:', err)
    res.status(500).send(err.message)
  }
})

/*
ЛКМ / ПКМ
*/
router.post('/mouse', (req, res) => {

  const { button } = req.body

  if (!button) {
    return res.status(400).send('No button')
  }

  try {
    // Check if bot is spawned
    if (!bot.entity) {
      return res.status(400).send('Bot not spawned yet')
    }

    if (button === 'left') {
      bot.swingArm()
    } else if (button === 'right') {
      bot.activateItem()
    } else {
      return res.status(400).send('Invalid button: ' + button)
    }

    res.send({
      status: 'ok'
    })

  } catch (err) {
    console.error('Mouse error:', err)
    res.status(500).send(err.message)
  }
})

module.exports = router