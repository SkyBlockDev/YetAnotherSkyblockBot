const config = require('../files/config.json')
module.exports = async (client, instance) => {
  console.clear
  const { status, games, interval } = config.presence;

        // —— Set default presence
        games instanceof Array && games.length > 0 &&
            client.user.setPresence({
                status,
                activity: {
                    name: games[0].name ? games[0].name : null,
                    type: games[0].type ? games[0].type : null,
                    url : games[0].url  ? games[0].url  : null
                }
            });

		games instanceof Array && games.length > 1 &&
		
            setInterval(() => {

				const index = Math.floor(Math.random() * (games.length));
				
                client.user.setActivity(games[index].name, {
                    type: games[index].type,
                    url : games[index].url || "https://www.twitch.tv/"
                });
            }, ((typeof interval === "number" && interval) || 30) * 1000);

}