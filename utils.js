const { MessageEmbed } = require("discord.js");

//Creating Problem Constructor
module.exports.LeetCodeProblem = function (problemObject) {
  this.id = problemObject.stat.question_id;
  this.title = problemObject.stat.question__title;
  this.difficulty =
    problemObject.difficulty.level === 3
      ? "Hard"
      : problemObject.difficulty.level === 2
      ? "Medium"
      : "Easy";
  this.paidOnly = problemObject.paid_only;
  this.titleSlug = problemObject.stat.question__title_slug;
  this.description = `Problem ID: ${this.id}\nTitle: ${this.title}\nSlug Title: ${this.titleSlug}\nDifficulty: ${this.difficulty}\nIs Paid? ${this.paidOnly}`;
};

module.exports.generateRandomIndex = function (length) {
  return Math.floor(Math.random() * length);
};

module.exports.sendProblem = function (message, difficulty = " ", problems) {
  if (difficulty !== " ") {
    problems = problems.filter((problem) => {
      return problem.difficulty.toLowerCase() === difficulty;
    });
  }
  const index = this.generateRandomIndex(problems.length);
  const problem = problems[index];
  const problemURL = "https://leetcode.com/problems/" + problem.titleSlug + "/";
  const msg = new MessageEmbed()
    .setTitle(problem.title)
    .setColor("#f89f1b")
    .setThumbnail("https://leetcode.com/static/images/LeetCode_logo_rvs.png")
    .setDescription(
      `${problem.difficulty} ${
        problem.paidOnly ? "locked/paid" : "unlocked/free"
      } problem.`
    )
    .setURL(problemURL);
  message.channel.send({ embeds: [msg] });
};
