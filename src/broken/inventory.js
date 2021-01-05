const config = require('../bot/files/config.json')
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


const fetchMojang = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0].toLowerCase()}`);
            const responseMojang = await fetchMojang.json();
            const fetchProf = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${responseMojang.name}`);
            const profileData = await fetchProf.json();

            let msg = await message.channel.send(`Fetching data. stats of ${responseMojang.name}...`)

            let a1 = '';
            for (length in profileData.members[responseMojang.id].inventory) {
                let a2 = profileData.members[responseMojang.id].inventory[length].name;
                if(isNullOrUndefined(a2)) {
                    a2 = 'EMPTY';
                }
                console.log(a2.replace(/§/g, '').replace(/d/, ''));
                a1 += `${length}. ${a2.replace(/§/g, '').replace(/d/, '').replace(/9/, '').replace(/6/, '').replace(/a/, '').replace(/2/, '').replace(/e/, '').replace(/c/, '').replace(/f/, '').replace(/5/, '')} x${profileData.members[responseMojang.id].inventory[length].count}\n`;
            }
            msg.edit(a1);
  }
}

