const snek = require('snekfetch');
const cheerio = require('cheerio');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
	if (!args || args.length < 1) return message.reply('Must provide a servant to search. Umu.');

	let embed = new RichEmbed().setColor(0xff0000);
	let servantList = [];

	// Collecting servant info
	const jsonList = await snek.get(
		'https://grandorder.gamepress.gg/sites/grandorder/files/fgo-jsons/servants.json?v10'
	);
	jsonList.body.forEach(function(obj) {
		var ch = cheerio.load(obj.title);
		servantList.push({
			id: obj.servant_id,
			title: ch('a').text(),
			profile: `https://grandorder.gamepress.gg${ch('a').attr('href')}`,
			portrait: `https://grandorder.gamepress.gg${ch('.servant-icon img').attr('src')}`,
			class: obj.field_class,
			stars: `${`★`.repeat(obj.stars.charAt(0))}`,
			deck: `${ch('.servant-deck span')
				.map(function(i, el) {
					return ch(this).text();
				})
				.get()
				.join(` `)}`,
			tier: obj.tier,
			release_status: obj.release_status
		});
	});

	// Search parameter checking
	if (/^\d+$/.test(args[0])) {
		// It was an ID number
		message.react('🆔');
		var servantFound = servantList.find((element) => {
			return element.id == parseInt(args[0]);
		});
		if (!servantFound) return message.reply(`Umu. Invalid ID number...`);

		// console.log(servantFound);

		// Get scraped info from that servant's web page
		var profileURL = await snek.get(`${servantFound.profile}`);
		var chd = cheerio.load(profileURL.body);

		// Build the response
		embed
			.setTitle(servantFound.title)
			.setURL(servantFound.profile)
			.setDescription(`${chd('p:nth-child(14)').text()}\n\n${chd('p:nth-child(15)').text()}`)
			.setThumbnail(servantFound.portrait)
			.addField(`Class`, `\`${servantFound.class}\``, true)
			.addField(`Tier`, `\`${servantFound.tier}\``, true)
			.addField(`Rarity`, `\`${servantFound.stars}\``, true)
			.addField(`Deck`, `\`${servantFound.deck}\``, true)
			.addField(`Release`, `\`${servantFound.release_status}\``, true);
	} else {
		// It was some other string
		message.react('📛');
		var servantsFound = servantList.filter((servant) =>
			servant.title.toLowerCase().includes(args.map((arg) => arg.toLowerCase()).join(' '))
		);
		if (!servantsFound || !servantsFound[0]) return message.reply(`Umu. Invalid servant name...`);
		if (servantsFound.length > 5) return message.reply(`Umu. Too many servants...`);
		[ first, ...rest ] = servantsFound;
		// Get scraped info from that servant's web page
		var profileURL = await snek.get(`${first.profile}`);
		var chd = cheerio.load(profileURL.body);

		// Build the response
		embed
			.setTitle(first.title)
			.setURL(first.profile)
			.setDescription(`${chd('p:nth-child(14)').text()}\n\n${chd('p:nth-child(15)').text()}`)
			.setThumbnail(first.portrait)
			.addField(`Class`, `\`${first.class}\``, true)
			.addField(`Tier`, `\`${first.tier}\``, true)
			.addField(`Rarity`, `\`${first.stars}\``, true)
			.addField(`Deck`, `\`${first.deck}\``, true)
			.addField(`Release`, `\`${first.release_status}\``, true);
		if (rest.length >= 1) {
			embed
				.addBlankField()
				.addField(
					`Others found`,
					`${rest.map((item, i) => `\`${item.title} - ID: ${item.id}\``).join(`\n`)}`,
					false
				);
		}
	}

	// If the embed is empty is because we couldn't find anything
	if (embed.fields.length > 0) message.channel.send({ embed });
	else message.channel.send("Umu couldn't find anything 😭");
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
