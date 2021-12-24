const { CommandInteractionOptionResolver } = require("discord.js");
const cron = require("node-cron");

const automatedMessage = (query, client, channel_id) => {
  cron.schedule(query, () => {
    const message = "Hello!";
    const channel = client.channels.cache.get(channel_id);
    channel.send(message);
  });
};

module.exports = automatedMessage;
