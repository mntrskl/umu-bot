exports.run = async (client, message, args, level) => {};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Hero"
};

exports.help = {
  name: "cgg",
  category: "⚔ League of Legends",
  description: "Champion.gg build search.",
  usage: "cgg <champion name> <role>"
};
