
const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');
module.exports = {
  aliases: [''],
  description: 'retrieve hypixel stats',
  callback: async ({ message, args }) => {
            if(!args) return message.reply('try again but this time actually mention a person')
            let msg = await message.channel.send('Fetching data....');

            fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
                .then(result => result.json())
                .then(async ({
                    id,
                    name
                }) => {

                    const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[0]}`);
                    const profileData = await fetchProf.json();

                    let embed = new Discord.MessageEmbed()
                        .setTitle(`${name}'s Kill Counts`)
                        .setColor("RED")
                        .setFooter(expMessage)

                    for (const key in profileData.members[id].stats.kills) {
                        embed.addField(key.replace(/_/g, ' '), profileData.members[id].stats.kills[key], true)
                    }
                    msg.edit('', embed)
                })

  }
}
