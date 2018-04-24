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

		const embed = new RichEmbed().setColor(0xff0000).setTitle(`Servant ID's Found`);
		const scrap = $('body').scrape(client.scrape.fgoServants, { string: false });

		for (let servant of scrap.servants) {
			// console.log(servant);
			if (
				servant.usaName.toLowerCase().includes(args.map((arg) => arg.toLowerCase()).join(' ')) &&
				embed.fields.length < 25
			) {
				embed.addField(servant.usaName, `ID: ${servant.id} - ${servant.rarity}`, true);
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
