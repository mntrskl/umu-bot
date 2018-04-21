const snek = require("snekfetch");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
  if (!args || args.length < 2)
    return message.reply("Must provide a parameter plus champ name to search. Umu.");
  const [info, ...champComp] = args.splice(0);
  const champ = champComp.join(' ');
  snek
    .get(`http://api.champion.gg/champion/${champ}/${info}/mostPopular?api_key=${client.config.cggApi}`)
    .then(r => r.body)
    .then(b => {
      console.log(b);
      b.forEach(role => {
        const embed = new RichEmbed()
          .setColor(0xff0000)
          .setTitle(`Runes for ${champ} on ${role.role}`);
        role.runes.forEach(rune => {
          embed.addField(`${rune.name} x${rune.number}`, `${rune.description}`);
        })
        message.channel.send({ embed });
      });
    })
    .catch(function (err) {
      message.channel.send(`Champion not found Umu.`);
    });
};

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
