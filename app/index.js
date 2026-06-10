const express = require('express')
const app = express()
const bot = require('../bot')

const botControlRoutes = require('./routes/botControl')

app.use(express.json())
app.use('/bot', botControlRoutes)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

const PORT = process.env.WEB_PORT || 3000

app.listen(PORT, () => {
  console.log('Web panel running on port ' + PORT)
})