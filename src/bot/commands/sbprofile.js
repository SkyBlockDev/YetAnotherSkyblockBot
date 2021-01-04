const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');


module.exports = {
  aliases: ['sbp'],
  description: 'retrieve hypixel stats',
  callback: ({ message, args }) => {


     hypixel.SkyblockMember('trickedmc').then(async (player) => {
message.reply(player.fairySouls + player.getEnderChest() )
})

  }
}


