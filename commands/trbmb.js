const { RichEmbed } = require('discord.js');
var snek = require('snekfetch');

exports.run = async (client, message, args, level) => {
	snek.get('http://api.chew.pro/trbmb').then((r) => r.body).then((b) => {
		const embed = new RichEmbed().setColor(0xff0000).setTitle(`${b[0]}`);
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
	name: 'trbmb',
	category: 'Random',
	description: 'That really *blanks* my *blank*.',
	usage: 'trbmb'
};
