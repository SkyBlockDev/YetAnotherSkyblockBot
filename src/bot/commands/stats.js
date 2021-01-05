const config = require('../files/config.json')
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client(config.HyApiKey);
const Discord = require('discord.js');

module.exports = {
	name: 'stats',
  cooldown: '10s',
	description: 'retrieve hypixel stats',
	execute({message, args}) {

if(!args) return message.reply("Use as the following: ya stats <skywars, bedwars, duals, hypixel> <player name>")


		const name = args[1];
	const arr = ['skywars', 'bedwars', 'duals', 'hypixel']
    hypixel.getPlayer(name).then(async (player) => {
    const game = player.stats;
    const embed = new Discord.MessageEmbed();
		if (player.isOnline != false) {
      embed.setColor('#51eb39');
      embed.setFooter('User is currently online');
    }
else{
      embed.setColor('#eb3939');
      embed.setFooter('User is currently offline');
    }
		switch (args[0]) {
			case 'skywars':
			embed.setAuthor(player.nickname);
			embed.setDescription('Skywars Stats');
			embed.addField('Total Games', game.skywars.playedGames, true);
			embed.addField('Wins', game.skywars.wins, true);
			embed.addField('Kills', game.skywars.kills, true);
			embed.addField('Coins', game.skywars.coins, true);
			embed.addField('Tokens', game.skywars.tokens, true);
			embed.addField('Level', game.skywars.levelFormatted, true);
			embed.addField('KDR', game.skywars.KDRatio, true);
			embed.addField('Heads', game.skywars.heads, true);
			embed.addField('Souls', game.skywars.souls, true);
			embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
				try {
					message.channel.send({ embed });
				}
				catch (e) {
					console.error(e);
					message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
				}
				break;
			case 'bedwars':
			embed.setAuthor(player.nickname);
			embed.setDescription('Bedwars Stats');
			embed.addField('Total Games', game.bedwars.playedGames, true);
			embed.addField('Wins', game.bedwars.wins, true);
			embed.addField('Kills', game.bedwars.kills, true);
			embed.addField('Final Kills', game.bedwars.finalKills, true);
			embed.addField('Coins', game.bedwars.coins, true);
			embed.addField('Level', game.bedwars.level, true);
			embed.addField('KDR', game.bedwars.KDRatio, true);
			embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
				try {
					message.channel.send({ embed });
				}
				catch (e) {
					console.error(e);
					message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
				}
				break;
			case 'duels':
			embed.setAuthor(player.nickname);
			embed.setDescription('Duels Stats');
			embed.addField('Total Games', game.duels.playedGames, true);
			embed.addField('Wins', game.duels.wins, true);
			embed.addField('Kills', game.duels.kills, true);
			embed.addField('Coins', game.duels.coins, true);
			embed.addField('KDR', game.duels.KDRatio, true);
			embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
				try {
					message.channel.send({ embed });
				}
				catch (e) {
					console.error(e);
					message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
				}
				break;
				case 'hypixel':
				try {
				embed.setAuthor(player.nickname);
				embed.addField('Rank', player.rank, true);
				embed.addField('Level', player.level, true);
				embed.addField('Gifts Sent', player.giftsSent, true);
				embed.addField('ACH Points', player.achievementPoints, true);
				embed.addField('Karma', player.karma, true);
				embed.setThumbnail(`http://cravatar.eu/helmhead/${name}.png`);
						message.channel.send({ embed });
					}
					catch (e) {
						console.error(e);
						message.reply('The player you specified doesn\'t exist or hasn\'t joined the hypixel network');
					}
					break;
			default:
			message.reply("Use as the following: ya stats <skywars, bedwars, duals, hypixel> <player name>")
				break;
		}
});
},
};