const 
    TelegramBot = require('node-telegram-bot-api'),
    token = '1363148524:AAGj3v-7QvXmK3WRNjBkom3RrDp5Ypg6z_k',
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

module.exports = [...usersId]