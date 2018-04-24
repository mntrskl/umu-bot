const snek = require('snekfetch');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');
	message.react('🤔');

	//001.2
	snek.get(`http://fate-go.cirnopedia.org/servant_profile.php?servant=${args[0]}`).then((r) => r.body).then((b) => {
		let $ = cheerio.load(b);
		jsonframe($);

		// let frame = {
		// 	profile: {
		// 		_s: '#rounded-corner',
		// 		_d: {
		// 			name: 'tr:nth-child(1) > td:last-child.desc',
		// 			class: 'tr:nth-child(2) > td:last-child.desc',
		// 			rarity: 'tr:nth-child(3) > td:last-child.desc',
		// 			cost: 'tr:nth-child(3) > td:nth-child(0).desc'
		// 		}
		// 	}
		// };
		console.log($('body').scrape(client.scrape.fgoServantProfile, { string: true }));
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Hero'
};

exports.help = {
	name: 'fgo-profile',
	category: '🔮 Fate Grand Order',
	description: 'Cirnopedia Servant Profile by ID.',
	usage: 'fgo-profile id:<servant name>'
};
