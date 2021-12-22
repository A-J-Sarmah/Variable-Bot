const { MessageEmbed } = require("discord.js");

const CreateEmbed = (config) => {
  const embed = new MessageEmbed()
    .setColor(config.color)
    .setTitle(config.title)
    .setURL(config.URL)
    .setTimestamp(Date.now())
    .setFooter("Variable Bot", "");

  if (config.URL) {
    embed.setURL(config.URL);
  }

  if (config.thumbnail) {
    embed.setThumbnail(config.thumbnail);
  }

  if (config.description) {
    embed.setDescription(config.description);
  }

  if (config.fields && config.fields.length !== 0) {
    config.fields.forEach((entry) => {
      embed.addField(entry.name, entry.value, entry.inline);
    });
  }

  return embed;
};

module.exports = CreateEmbed;
