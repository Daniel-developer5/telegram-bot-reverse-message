const 
    express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    TelegramBot = require('node-telegram-bot-api'),
    token = '************************************',
    bot = new TelegramBot(token, { polling: true }),
    START_TEXT = require('./start-text')

const usersId = new Set()

const commands = ['/start']
    
bot.onText(/\/start/, message => {
    const { id } = message.chat
    
    bot.sendMessage(id, START_TEXT, { parse_mode: 'HTML' })
})
    
bot.on('message', message => {
    const { id } = message.chat
        
    usersId.add(id)
    
    if (!message.text) {
        bot.sendMessage(id, 'Sorry, I can\'t reverse this message, please send a text :)')
    
        return
    }
        
    if ( commands.every(command => !message.text.match(command)) ) 
        bot.sendMessage(id, message.text.split('').reverse().join(''))
})

app.use(express.static('public'))

app.use(express.json())

app.get('/users', (req, res) => res.send({ users: [...usersId] }))

app.post('/send', (req, res) => {
    const 
        { message } = req.body
        usersIdArr = [...usersId]
    
    usersIdArr.forEach(id => bot.sendMessage(id, message, { parse_mode: 'HTML' }))
    
    res.send({ success: true })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))