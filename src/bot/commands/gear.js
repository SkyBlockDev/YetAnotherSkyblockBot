
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
            try {
                let expMessage = 'Keep in mind this is experimental!\nThere are many bugs in this command!\nIf you get an error message then please report it to tricked#3777';
                let msg = await message.channel.send('Fetching data....');

                fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
                    .then(result => result.json())
                    .then(async ({
                        id,
                        name
                    }) => {

                        const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[0]}`);
                        const profileData = await fetchProf.json();

                        fs.writeFile('./nbt.json', JSON.stringify(profileData, null, 4), err => {
                            if (err) return console.error(err)
                        });

                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${name}'s SkyBlock Stats`)
                            .setColor("RED")
                            .addField('Health:', profileData.members[id].attributes.health.toFixed(1), true)
                            .addField('Effective Health:', profileData.members[id].attributes.effective_health.toFixed(1), true)
                            .addField('Defense:', profileData.members[id].attributes.defense.toFixed(1), true)
                            .addField('Strength:', profileData.members[id].attributes.strength.toFixed(1), true)
                            .addField('Speed:', profileData.members[id].attributes.speed.toFixed(1), true)
                            .addField('Crit Chance:', profileData.members[id].attributes.crit_chance.toFixed(1), true)
                            .addField('Crit Damage:', profileData.members[id].attributes.crit_damage.toFixed(1), true)
                            .addField('Current Purse:', profileData.members[id].coin_purse.toFixed(1), true)
                            .addField('Death Count', profileData.members[id].death_count, true)
                            .addField('Highest Critical Damage', profileData.members[id].stats.highest_critical_damage.toFixed(1), true)
                            .setFooter(expMessage)

                        if (profileData.members[id].armor[3].name != null || profileData.members[id].armor[3].name != undefined) embed.addField('Helmet', profileData.members[id].armor[3].name.replace(/§/g, '').replace(/\d+/g, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[2].name != null || profileData.members[id].armor[2].name != undefined) embed.addField('Chestplate', profileData.members[id].armor[2].name.replace(/§/g, '').replace(/\d+/g, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[1].name != null || profileData.members[id].armor[1].name != undefined) embed.addField('Leggings', profileData.members[id].armor[1].name.replace(/§/g, '').replace(/\d+/g, '').replace('d', '').replace('f', ''));
                        if (profileData.members[id].armor[0].name != null || profileData.members[id].armor[0].name != undefined) embed.addField('Boots', profileData.members[id].armor[0].name.replace(/§/g, '').replace(/\d+/g, '').replace('d', '').replace('f', ''));

                        msg.edit('', embed);

                    })

            } catch (err) {
                console.error(err);
            }

  }
}
