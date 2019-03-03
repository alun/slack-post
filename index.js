const Bot = require('slackbots')
const express = require('express')
const bodyParser = require('body-parser')

// create a bot
const settings = {
    token: process.env.TOKEN
}
const bot = new Bot(settings)

bot.on('start', function() {

  const app = express()
  const port = process.env.PORT

  try {
    app.use(bodyParser.urlencoded({extended: false}))

    app.post('/', function (req, res) {
      bot.postMessageToUser(process.env.USER, req.body.sender + ' ' + req.body.body);
      res.send('<p>ok</p>')
    })

    app.listen(port, function () {
      console.log(`Waiting for POST request on port ${port}!`)
    })
  }
  catch (e) {
    console.error(e)
  }

})

