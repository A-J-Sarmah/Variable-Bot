const { CommandInteractionOptionResolver } = require("discord.js");
const cron = require("node-cron");

const automatedMessage = (query, client) => {
  cron.schedule(query, () => {
    console.log("running a task every minute");
    const message = "Hello!";
    const channel = client.channels.cache.get("916938129913548850");
    channel.send(message);
  });
};

module.exports = automatedMessage;
