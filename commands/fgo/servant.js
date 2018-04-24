const snek = require("snekfetch");
const cheerio = require("cheerio");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!args || args.length < 1)
    return message.reply("Must provide a servant to search. Umu.");

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Hero"
};

exports.help = {
  name: "sid",
  category: "🔮 Fate Grand Order",
  description: "Cirnopedia Servant ID search.",
  usage: "sid <servant name>"
};
