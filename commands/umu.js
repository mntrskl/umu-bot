const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	const embed = new RichEmbed()
		.setColor(0xff0000)
		.setTitle('✨ UMU! ✨')
		.setImage('https://pbs.twimg.com/media/CtSfo7GXYAAE5bi.jpg');

	message.channel.send({ embed }).catch((err) => {
		message.channel.send("Can't umu right now...");
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User'
};

exports.help = {
	name: 'umu',
	category: 'Random',
	description: 'Umu!',
	usage: 'umu'
};
