const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');
const fetch = require('cross-fetch');
const slothpixel = require('slothpixel');
const fs = require('fs');
const nbt = require('prismarine-nbt');
module.exports = {
  aliases: ['inv'],
  cooldown: '10s',
  description: 'retrieve hypixel stats',
  callback: async ({ message, args }) => {
      if(!args) return message.reply('try again but this time actually mention a person')
            const fetchMojang = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0].toLowerCase()}`);
            const responseMojang = await fetchMojang.json();
            const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${responseMojang.name}`);
            const profileData = await fetchProf.json();

            let embed = new Discord.MessageEmbed()
                .setTitle(`Skills of ${responseMojang.name}`)
                .setColor("RED")

            for (key in profileData.members[responseMojang.id].skills) {
                if(profileData.members[responseMojang.id].skills[key].xpForNext == null || profileData.members[responseMojang.id].skills[key].xpForNext == undefined) {
                    profileData.members[responseMojang.id].skills[key].xpForNext = 'MAXED'
                }

                embed.addField(key, `**Current Level:** ${profileData.members[responseMojang.id].skills[key].level}\n**Current XP:** ${profileData.members[responseMojang.id].skills[key].xpCurrent}\n**XP Till next level:** ${profileData.members[responseMojang.id].skills[key].xpForNext}`, true)
            }

            message.channel.send(embed);

  }
}
