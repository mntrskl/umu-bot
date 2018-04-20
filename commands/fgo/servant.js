const snek = require("snekfetch");
const cheerio = require("cheerio");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!args || args.length < 1)
    return message.reply("Must provide a servant to search. Umu.");

  snek
    .get("https://fate-go.cirnopedia.org/servant_all.php#nav")
    .then(r => r.body)
    .then(r => {
      var ch = cheerio.load(r);
      const rows = ch("tr.US");
      const results = [];
      const embed = new RichEmbed()
        .setColor(0xff0000)
        .setTitle(`Servant ID's Found`);

      rows.each(function(i, element) {
        const row = ch(element);
        const children = row.children("td")[3];
        if (
          ch(children)
            .attr("sorttable_customkey")
            .toLowerCase()
            .includes(args.map(arg => arg.toLowerCase()).join(" "))
        ) {
          //   results.push({
          //     id: row.attr("id"),
          //     sName: ch(children).text(),
          //     fName: ch(children).attr("sorttable_customkey"),
          //     profile: ch(children)
          //       .children("a")
          //       .attr("href")
          //   });
          embed.addField(
            ch(children).attr("sorttable_customkey"),
            `ID: ${row.attr("id")}`,
            true
          );
        }
      });
      //   message.reply(
      //     `Umu found
      //      \`${results.map((val, i) => `${val.fName} - ${val.id}`)}\``
      //   );
      if (embed.fields.length > 0) message.channel.send({ embed });
      else message.channel.send("Umu couldn't find anything 😭");
    });
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
