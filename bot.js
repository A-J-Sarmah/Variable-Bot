require("dotenv").config();

const { default: axios } = require("axios");
const { Client, Intents, MessageEmbed } = require("discord.js");
const { DISCORD_BOT_TOKEN } = process.env;
const variables = require("./config");
const prefix = "!problem";
const leetCodeApiURL = "https://leetcode.com/api/problems/all/";
const utils = require("./utils");
const problems = [];
let totalProblemGenerated = 0;

// CLIENT CREATION
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

//IMPORTING PROBLEMS
axios.get(leetCodeApiURL).then((response) => {
  response.data.stat_status_pairs.forEach((problem) => {
    const newProblem = new utils.LeetCodeProblem(problem); //creates new problems with the help of the constructor imported from utils
    problems.push(newProblem);
  });
  totalProblemGenerated = problems.length;
  console.log(problems);
});

// BOT GETS READY
client.on("ready", () => {
  console.log("Bot is Online and Responsive");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  let difficulty;
  if (command === "easy" || command === "medium" || command === "hard") {
    difficulty = command;
    utils.sendProblem(message, difficulty, problems);
  } else if (command === "info") {
    message.channel.send(
      `Leetcode currently has a total of ${totalProblemGenerated} problems. We can generate one for yeh 😉\n\n\n` +
        "Type ```!problem``` to generate one!"
    );
  } else if (command === "help") {
    message.channel.send(
      "```Usage:\n\n\t!problem (without args) - gives you a random problem of any difficulty either paid/free." +
        "\n\nAdding difficulty modifiers:\n\n\t!problem <easy | medium | hard> - lets you pick a random problem of chosen difficulty.```"
    );
  } else {
    utils.sendProblem(message, difficulty, problems);
  }
});

// GUILD CREATION
client.on("guildCreate", (guild) => {
  let icon = guild.icon;
  let name = guild.name;

  //   Change Bot Nickname for the server to -> (name + Bot)
});

// GIVES BOT A ROLE
client.login(DISCORD_BOT_TOKEN);
