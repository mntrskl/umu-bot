const { Client, Message, RichEmbed } = require("discord.js");
var snek = require("snekfetch");
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
exports.run = async (client, message, args, level) => {
  const [embedChannel, embedType, ...embedRest] = args.splice(0);
  let chan = client.channels.find("name", embedChannel);
  const embed = new RichEmbed().setColor(0xff0000);
  if (chan) {
    switch (embedType) {
      case "text":
        embed.setTitle(embedRest.join(" "));
        break;
      case "url":
        let [eUrl, ...eTitle] = embedRest.splice(0);
        embed.setTitle(eTitle.join(" "));
        embed.setURL(eUrl);
        break;
      // case "image":
      // break;
      default:
        message.channel.send(
          `= ${this.help.name} = \n${this.help.description}\nusage::${
            this.help.usage
          }`,
          {
            code: "asciidoc"
          }
        );
        return;
    }
    message.guild
      .fetchMember(message.author)
      .then(usr => {
        embed.setFooter(usr.nickname, message.author.avatarURL);
        embed.setTimestamp(new Date());
        chan
          .send({ embed })
          .then(message.delete(50))
          .catch(err => {
            message.channel.send("Can't umu right now...");
          });
      })
      .catch(err => {
        message.channel.send("...");
      });
  } else {
    message.channel.send(
      `= ${this.help.name} = \n${this.help.description}\nusage::${
        this.help.usage
      }`,
      {
        code: "asciidoc"
      }
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mini Boss"
};

exports.help = {
  name: "embed",
  category: "Information",
  description: "Create embed and publish it to [channel]",
  usage: "embed [channel-name] [<text or url>] [url?] [text]"
};
