const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	let embed = new RichEmbed().setColor(0xff0000);
	embed
		.setTitle(`Umu!`)
		.setImage(`https://78.media.tumblr.com/b9e76d3edad13108bed384f4057181a0/tumblr_ohd9nzpJhz1tgkg4yo1_1280.jpg`);

	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Hero'
};

exports.help = {
	name: 'umu',
	category: '🔮 Fate Grand Order',
	description: 'Umu.',
	usage: 'umu'
};
