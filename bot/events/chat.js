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

  // Клавиатура управления
  const controls = {
    'KeyW': 'forward',
    'KeyA': 'left',
    'KeyS': 'back',
    'KeyD': 'right',
    'Space': 'jump',
    'ShiftLeft': 'sprint',
    'ShiftRight': 'sprint',
    'ArrowUp': 'pitch_up',
    'ArrowDown': 'pitch_down',
    'ArrowLeft': 'yaw_left',
    'ArrowRight': 'yaw_right'
  }

  // Обработка нажатия клавиш
  process.stdin.on('keypress', (str, key) => {
    if (key.code === 'q') {
      bot.quit()
      process.exit()
    }

    // Управление движением
    if (controls[key.code]?.includes('forward') || controls[key.code]?.includes('back') || 
        controls[key.code]?.includes('left') || controls[key.code]?.includes('right')) {
      bot.setControlState(controls[key.code], true)
    }

    // Прыжок
    if (key.code === 'Space') {
      bot.setControlState('jump', true)
    }

    // Спринт
    if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
      bot.setControlState('sprint', true)
    }

    // Поворот головы стрелками
    if (key.code === 'ArrowUp') {
      bot.look(bot.entity.yaw, bot.entity.pitch - 0.05)
    }
    if (key.code === 'ArrowDown') {
      bot.look(bot.entity.yaw, bot.entity.pitch + 0.05)
    }
    if (key.code === 'ArrowLeft') {
      bot.look(bot.entity.yaw - 0.1, bot.entity.pitch)
    }
    if (key.code === 'ArrowRight') {
      bot.look(bot.entity.yaw + 0.1, bot.entity.pitch)
    }
  })

  // Отпускание клавиш
  process.stdin.on('keyup', (str, key) => {
    // Отпускание движения
    if (controls[key.code]?.includes('forward') || controls[key.code]?.includes('back') || 
        controls[key.code]?.includes('left') || controls[key.code]?.includes('right')) {
      bot.setControlState(controls[key.code], false)
    }

    // Отпускание прыжка
    if (key.code === 'Space') {
      bot.setControlState('jump', false)
    }

    // Отпускание спринта
    if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
      bot.setControlState('sprint', false)
    }
  })
}
