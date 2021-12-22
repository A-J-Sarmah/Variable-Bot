require("dotenv").config();

const { Client } = require("discord.js");
const { DISCORD_BOT_TOKEN } = process.env;
const { PREFIX } = require("./config");

// TASKs IMPORT
const leetcodeProblem = require("./function/leetcodeQuestion");

// CLIENT CREATION
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

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

client.on("messageCreate", (message) => {
  // Checking for PREFIX
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  // Processing Message
  const args = message.content
    .toLowerCase()
    .slice(PREFIX.length + 1)
    .trim()
    .split(" ");

  // Extraction of TASK Command
  const command = args.shift();

  // Managing TASKs

  switch (command) {
    case "problem":
      leetcodeProblem(message, args);
      break;

    default:
      break;
  }
});

// GIVES BOT A ROLE
client.login(DISCORD_BOT_TOKEN);
