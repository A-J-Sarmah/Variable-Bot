const createEmbed = require("../helper/createEmbed");
const axios = require("axios");
const { Brand_Color_Code } = require("../config");
const leetCodeApiURL = "https://leetcode.com/api/problems/all";

//IMPORTING PROBLEMS
// axios.get(leetCodeApiURL).then((response) => {
//   response.data.stat_status_pairs.forEach((problem) => {
//     const newProblem = new utils.LeetCodeProblem(problem); //creates new problems with the help of the constructor imported from utils
//     problems.push(newProblem);
//   });
//   totalProblemGenerated = problems.length;
// });

// client.on("messageCreate", (message) => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   const args = message.content.slice(prefix.length).trim().split(" ");
//   const command = args.shift().toLowerCase();
//   let difficulty;
//   if (command === "easy" || command === "medium" || command === "hard") {
//     difficulty = command;
//     utils.sendProblem(message, difficulty, problems);
//   } else if (command === "info") {
//     message.channel.send(
//       `Leetcode currently has a total of ${totalProblemGenerated} problems. We can generate one for yeh 😉\n\n\n` +
//         "Type ```!problem``` to generate one!"
//     );
//   } else if (command === "help") {
//     message.channel.send(
//       "```Usage:\n\n\t!problem (without args) - gives you a random problem of any difficulty either paid/free." +
//         "\n\nAdding difficulty modifiers:\n\n\t!problem <easy | medium | hard> - lets you pick a random problem of chosen difficulty.```"
//     );
//   } else {
//     utils.sendProblem(message, difficulty, problems);
//   }
// });

const leetcodeProblem = async (message, args) => {
  let problems = [];
  let totalProblemGenerated = 0;
  let command = args.shift();

  try {
    // Fetch Problems
    let response = await axios.get(leetCodeApiURL);

    if (command === "easy" || command === "medium" || command === "hard") {
    } else if (command === "info") {
      const embed = createEmbed({
        color: Brand_Color_Code,
        title: "LeetCode Info",
        URL: "https://leetcode.com/",
      });
      message.channel.send({ embeds: [embed] });
    } else {
      
    }
    // Total
    totalProblemGenerated = response.data.num_total;

    // Managing Problems
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = leetcodeProblem;
