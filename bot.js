require("dotenv").config();

const { Client, Intents } = require("discord.js");
const { DISCORD_BOT_TOKEN } = process.env;
const variables = require("./config");

// CLIENT CREATION
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// BOT GETS READY
client.on("ready", () => {
  console.log("Bot is Online and Responsive");
});

// GUILD CREATION
client.on("guildCreate", (guild) => {
  let icon = guild.icon;
  let name = guild.name;

  //   Change Bot Nickname for the server to -> (name + Bot)
  
});

// GIVES BOT A ROLE
client.login(DISCORD_BOT_TOKEN);
