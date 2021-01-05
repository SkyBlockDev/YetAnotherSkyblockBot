const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');
module.exports = {
  aliases: ['bz'],
  cooldown: '10s',
  description: 'retrieve hypixel stats',
  callback: async ({ message, args }) => {

let msg = await message.channel.send('Fetching data....');
let expMessage = 'Keep in mind this is experimental!\nThere are many bugs in this command!\nIf you get an error message then please report it to tricked#3777';


            try {

                let item = args.join(' ').replace(/ /g, '_').toUpperCase();
                if(!item) return message.reply("please select a item you want to find data of.")
                const bazaarResponse = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${item}`);
                const bazaarData = await bazaarResponse.json();
                const {
                    quick_status
                } = bazaarData;
                if(!quick_status) return message.reply("sorry coulnt find that item")
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Bazaar details of ${item.replace(/_/g, ' ').toLowerCase()}`)
                    .setColor("RED")
                    .setFooter(expMessage)
                    .addField('Buy Price:', quick_status.buyPrice.toFixed(1))
                    .addField('Sell Price:', quick_status.buyPrice.toFixed(1))
                msg.edit('', embed);
            } catch (err) {
                if (err) {
                    msg.edit(`There was an error Fetching data. that item!\n\n\`\`\`${err}\`\`\`\n\nPlease report this to tricked#3777`)
                    return console.error(err);
                }
            }
  }
}
