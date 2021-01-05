const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
module.exports = {
  aliases: [''],
  cooldown: '2s',
  description: 'retrieve hypixel stats',
  callback: ({ message }) => {

message.reply('List of all commands: Bazaar, help, kills, gear, skills, stats')
  }
}
