const snek = require('snekfetch');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');

	message.react('🤔');

	snek.get('https://fate-go.cirnopedia.org/servant_all.php#nav').then((r) => r.body).then((b) => {
		let $ = cheerio.load(b);
		jsonframe($);

		let frame = {
			servants: {
				_s: '#rounded-corner tr.US',
				_d: [
					{
						id: 'td:nth-child(3) @ sorttable_customkey',
						rarity: 'td:nth-child(2)',
						usa_name: 'td:nth-child(4) @ sorttable_customkey',
						jap_name: 'td:nth-child(4) a font',
						class: 'td:nth-child(5)',
						profile: 'td:nth-child(4) a @ href'
					}
				]
			}
		};

		const embed = new RichEmbed().setColor(0xff0000).setTitle(`Servant ID's Found`);
		const scrap = $('body').scrape(frame, { string: false });

		for (let servant of scrap.servants) {
			console.log(servant);
			if (
				servant.usa_name.toLowerCase().includes(args.map((arg) => arg.toLowerCase()).join(' ')) &&
				embed.fields.length < 25
			) {
				embed.addField(servant.usa_name, `ID: ${servant.id} - ${servant.rarity}`, true);
			}
		}
		if (embed.fields.length > 0) message.channel.send({ embed });
		else message.channel.send("Umu couldn't find anything 😭");
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Hero'
};

exports.help = {
	name: 'fgo-id',
	category: '🔮 Fate Grand Order',
	description: 'Cirnopedia Servant ID search by name.',
	usage: 'fgo-id <servant name>'
};
