const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	const embed = new RichEmbed()
		.setColor(0xff0000)
		.setTitle(`✨ Wahoooooooo!~ Oof! ✨`)
		.attachFile('https://vtt.tumblr.com/tumblr_p4qtprS3zJ1rem6er_480.mp4', 'Wahoooooooo');

	message.channel.send({ embed }).catch((err) => {
		message.channel.send("Can't umu right now...");
	});
	// message.channel.send('https://vtt.tumblr.com/tumblr_p4qtprS3zJ1rem6er_480.mp4');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User'
};

exports.help = {
	name: 'wahoo',
	category: 'Random',
	description: 'Wahoooooooo!',
	usage: 'wahoo'
};
