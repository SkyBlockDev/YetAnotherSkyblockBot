
const mojang = require('mojang-api');
const Discord = require('discord.js');

module.exports = {
    name: 'uuid',
    description: 'Finds a player\'s uuid from the nickaname',
    args: '<nickname>',
    execute({message, args}) {
        if(!args) {
            message.reply('please specify the player\'s name');
            return;
        }
        const embed = new Discord.MessageEmbed();
        mojang.nameToUuid(args[0], (err, resp) => {
        try {
            if( err || !resp[0].name) return message.channel.send('player not found beep boop')
          embed.setColor('#51eb39');
          embed.setDescription(`Player Name: ${resp[0].name}\nUUID: ${resp[0].id}`);
          message.channel.send({ embed });
      }
        catch (e) {
          console.error(e);
          embed.setDescription('There was an error fetching the UUID;');
        }
      });
      } };