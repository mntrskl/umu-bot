const snek = require('snekfetch');
const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');

	if (/^\d+$/.test(args[0])) {
		//ID
		message.react('🆔');
		// if (0 >= args[0] || args[0] >= 206) return message.reply('Must provide a servant to search. Umu.');

		var servant = args[0].padStart(3, '000');
		snek
			.get(`http://fate-go.cirnopedia.org/servant_profile.php?servant=${servant}`)
			.then((r) => r.body)
			.then((b) => {
				let $ = cheerio.load(b);
				jsonframe($);
				let embed = new RichEmbed().setColor(0xff0000);
				let scrap = $('body').scrape(client.scrape.fgoServantProfile, { string: false });
				console.log(scrap);

				if (servant != 1 && scrap.profile.id == 1) return message.reply('Wrong id master...');
				embed
					.setTitle(`${scrap.profile.name}`)
					.setURL(`http://fate-go.cirnopedia.org/servant_profile.php?servant=${servant}`)
					.setThumbnail(`http://fate-go.cirnopedia.org/icons/servant/servant_${servant}1.png`)
					.setDescription(`\*${scrap.profile.bio}\*`)
					.addField(`Rarity`, `${scrap.profile.rarity}`)
					.addField(`Class`, `${scrap.profile.class}`);
				// .addField()
				// .addField();

				if (embed.fields.length > 0) message.channel.send({ embed });
				else message.channel.send("Umu couldn't find anything 😭");
			});
	} else {
		//Name
		message.react('📛');
		snek.get('https://fate-go.cirnopedia.org/servant_all.php#nav').then((r) => r.body).then((b) => {
			let $ = cheerio.load(b);
			jsonframe($);
			let embed = new RichEmbed().setColor(0xff0000).setTitle('`Umu. Found:`');
			let scrap = $('body').scrape(client.scrape.fgoServants, { string: false });

			for (var servant of scrap.servants) {
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
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Hero'
};

exports.help = {
	name: 'fgo-srv',
	category: '🔮 Fate Grand Order',
	description: 'Cirnopedia Servant ID search by name.',
	usage: 'fgo-srv <servant name | servant id .ex 025>'
};
