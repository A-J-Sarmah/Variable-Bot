const { CommandInteractionOptionResolver } = require("discord.js");
const cron = require("node-cron");

const automatedMessage = (query, client, channel_id, message) => {
  cron.schedule(query, () => {
    const channel = client.channels.cache.get(channel_id);
    channel.send(message);
  });
};

module.exports = automatedMessage;
