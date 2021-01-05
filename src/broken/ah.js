
const config = require('../bot/files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');

module.exports = {
  aliases: ['auctionhouse'],
  description: 'retrieve hypixel stats',
  callback: async ({ message, args }) => {
            let expMessage = 'Keep in mind this is experimental!\nThere are many bugs in this command!\nIf you get an error message then please report it to tricked#3777';
            let msg = await message.channel.send('Fetching data....');

            try {

                let item = args.join(' ').replace(/ /g, '_').replace(/aspect of the dragons/g, 'aspect of the dragon').toUpperCase();
                const auctionResponse = await fetch(`https://api.slothpixel.me/api/skyblock/auctions/${item}`);
                const auctionData = await auctionResponse.json();
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Auction House details of ${item.replace(/_/g, ' ').toLowerCase()}`)
                    .setColor("RED")
                    .addField('Average Price:', auctionData.average_price)
                    .addField('Median Price:', auctionData.median_price)
                    .addField('Standard Deviation:', auctionData.standard_deviation)
                    .addField('Max Price:', auctionData.max_price)
                    .addField('Minimum Price:', auctionData.min_price)
                    .setFooter(expMessage)
                msg.edit('', embed);
            } catch (err) {
                if (err) {
                    msg.edit(`There was an error Fetching data. that item!\n\n\`\`\`${err}\`\`\`\n\nPlease report this to tricked#3777`)
                    return console.error(err);
                }
            }

  }
}
