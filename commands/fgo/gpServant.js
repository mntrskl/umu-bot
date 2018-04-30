const snek = require('snekfetch');
const cheerio = require('cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');

	if (/^\d+$/.test(args[0])) {
		//ID
		message.react('🆔');
		const { body } = await snek.get(
			'https://grandorder.gamepress.gg/sites/grandorder/files/fgo-jsons/servants.json?v10'
		);
		let embed = new RichEmbed().setColor(0xff0000);
		var found = body.find((element) => {
			return element.servant_id == parseInt(args[0]);
		});
		if (!found) return message.reply(`HANGOVER HANGOVER HANGOVER HANGOVER`);

		const ch = cheerio.load(found.title);
		// console.log(found);
		embed
			.setTitle(ch('a').text())
			.setDescription(`\*blegfh\*`)
			.setURL(``)
			.setThumbnail('https://grandorder.gamepress.gg' + ch('.servant-icon img').attr('src'))
			.addField(`Class`, `\`${found.field_class}\``, true)
			.addField(`Tier`, `\`${found.tier}\``, true)
			.addField(`Rarity`, `\`${`★`.repeat(found.stars.charAt(0))}\``, true)
			.addField(
				`Deck`,
				`\`${ch('.servant-deck span')
					.map(function(i, el) {
						return ch(this).text();
					})
					.get()
					.join(` `)}\``,
				true
			)
			.addField(`Release`, `\`${found.release_status}\``, true);
		if (embed.fields.length > 0) message.channel.send({ embed });
		else message.channel.send("Umu couldn't find anything 😭");
	} else {
		message.react('🐣');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'Hero'
};

exports.help = {
	name: 'fgo-gp',
	category: '🔮 Fate Grand Order',
	description: 'GamePress Servant search by name or ID.',
	usage: 'fgo-gp <servant name | servant id>'
};
