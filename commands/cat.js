const { RichEmbed } = require('discord.js');
var snek = require('snekfetch');

exports.run = async (client, message, args, level) => {
	snek.get('http://aws.random.cat/meow').then((r) => r.body).then((b) => {
		const embed = new RichEmbed().setColor(0xff0000).setTitle('🐱 Purrr...').setImage(b.file);
		message.channel.send({ embed });
		// eslint-disable-line no-unused-vars
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [ 'kitty' ],
	permLevel: 'User'
};

exports.help = {
	name: 'cat',
	category: 'Random',
	description: 'Here some pussies to lighten your day.',
	usage: 'cat'
};
