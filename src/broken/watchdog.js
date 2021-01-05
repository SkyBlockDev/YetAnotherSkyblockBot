const config = require('../bot/files/config.json')
const HypixelAPIReborn = require('hypixel-api-reborn');
const Discord = require('discord.js');

const hypixelAPIReborn = new HypixelAPIReborn.Client(config.HyApiKey);

module.exports = {
    name: 'watchdog',
    async execute({message, args, client}) {

        hypixelAPIReborn.getWatchdogStats().then(async (stats) => {

            const watchdogStatsEmbed = new Discord.MessageEmbed()
                .setTitle('Watchdog Stats')
                .setColor('RED')
                .addField('Total Watchdog bans:', stats.ByWatchdogTotal)
                .addField('Bans in the last minute:', stats.ByWatchDogLastMinute)
                .addField('Total staff bans', stats.ByStaffTotal)

            message.channel.send(watchdogStatsEmbed);

        });

    }
}