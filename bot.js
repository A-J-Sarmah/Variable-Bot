require("dotenv").config();

const { default: axios } = require("axios");
const { Client, Intents } = require("discord.js");
const { DISCORD_BOT_TOKEN } = process.env;
const variables = require("./config");
const prefix = "!problem";
const leetCodeApiURL = "https://leetcode.com/api/problems/all/";
const utils = require("./utils");
const problems = [];
let totalProblemGenerated = 0;

// CLIENT CREATION
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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

client.on("message", (message) => {});

// GUILD CREATION
client.on("guildCreate", (guild) => {
  let icon = guild.icon;
  let name = guild.name;

  //   Change Bot Nickname for the server to -> (name + Bot)
});

// GIVES BOT A ROLE
client.login(DISCORD_BOT_TOKEN);
