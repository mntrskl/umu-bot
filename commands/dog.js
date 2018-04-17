const { RichEmbed } = require("discord.js");
var snek = require("snekfetch");

exports.run = async (client, message, args, level) => {
  var url = null;
  if (!args[0]) {
    url = "https://dog.ceo/api/breeds/image/random";
  } else {
    const [breed, subbreed, ...extra] = args.splice(0);
    url = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`;
  }
  snek
    .get(url)
    .then(r => r.body)
    .then(b => {
      const embed = new RichEmbed()
        .setColor(0xff0000)
        .setTitle("🐺 Woof! Bork!")
        .setImage(b.message);
      message.channel.send({ embed }).catch(err => {
        message.channel.send(
          `= ${this.help.name} = \n${this.help.description}\nusage::${
            this.help.usage
          }`,
          {
            code: "asciidoc"
          }
        );
      });
    })
    .catch(function(err) {
      message.channel.send(
        `= ${this.help.name} = \n${this.help.description}\nusage::${
          this.help.usage
        }`,
        {
          code: "asciidoc"
        }
      );
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["doggo"],
  permLevel: "User"
};

exports.help = {
  name: "dog",
  category: "Random",
  description: "Here some doggos to lighten your day.",
  usage: "dog [breed] [sub-breed]"
};
