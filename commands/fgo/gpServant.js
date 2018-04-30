const snek = require('snekfetch');
const cheerio = require('cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');

	if (/^\d+$/.test(args[0])) {
		//ID
		message.react('🆔');
		const servantList = await snek.get(
			'https://grandorder.gamepress.gg/sites/grandorder/files/fgo-jsons/servants.json?v10'
		);
		let embed = new RichEmbed().setColor(0xff0000);

		var servantFound = servantList.body.find((element) => {
			return element.servant_id == parseInt(args[0]);
		});

		if (!servantFound) return message.reply(`That's the wrong number... Umu`);
		const ch = cheerio.load(servantFound.title);

		// Get scraped info from that servant's web page
		var servantURL = `https://grandorder.gamepress.gg${ch('a').attr('href')}`;
		const servantInfo = await snek.get(servantURL);
		const chd = cheerio.load(servantInfo.body);

		// console.log(chd('#ratingchart').html());

		// Build the response
		embed
			.setTitle(ch('a').text())
			.setURL(servantURL)
			.setDescription(`${chd('p:nth-child(14)').text()}\n\n${chd('p:nth-child(15)').text()}`)
			.setThumbnail(`https://grandorder.gamepress.gg${ch('.servant-icon img').attr('src')}`)
			.addField(`Class`, `\`${servantFound.field_class}\``, true)
			.addField(`Tier`, `\`${servantFound.tier}\``, true)
			.addField(`Rarity`, `\`${`★`.repeat(servantFound.stars.charAt(0))}\``, true)
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
			.addField(`Release`, `\`${servantFound.release_status}\``, true);

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
