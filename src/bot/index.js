const config = require('./files/config.json')

const Discord = require('discord.js')
const WOKCommands = require('wokcommands')

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {

  const messagesPath = './files/messages.json'

  const dbOptions = {
    keepAlive: false,
    useNewUrlParser: false,
    useUnifiedTopology: false,
    useFindAndModify: false,
  }

  new WOKCommands(client, {
    commandsDir: 'commands',
    featureDir: 'events',
    messagesPath,
    showWarns: true,
    dbOptions
  })
    .setDefaultPrefix(config.prefix)
    .setColor(0xff0000)
})

client.login(config.DiscordToken)