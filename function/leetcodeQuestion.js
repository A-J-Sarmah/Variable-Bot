const createEmbed = require("../helper/createEmbed");
const axios = require("axios");
const leetCodeApiURL = "https://leetcode.com/api/problems/all";

let IndividualProblem = class {
  constructor(problemObject) {
    this.id = problemObject.stat.question_id;
    this.title = problemObject.stat.question__title;
    this.difficulty =
      problemObject.difficulty.level === 3
        ? "Hard"
        : problemObject.difficulty.level === 2
        ? "Medium"
        : "Easy";
    this.access = problemObject.paid_only ? "Paid" : "Free";
    this.titleSlug = problemObject.stat.question__title_slug;
  }
};

const randomNumberGenerator = (length) => {
  return Math.floor(Math.random() * length);
};

const sendProblem = (message, problems, params, type = null) => {
  if (params === "difficulty") {
    if (type) {
      problems = problems.filter((problem) => {
        return problem.difficulty.toLowerCase() === type;
      });
    }
  } else if (params === "access") {
    if (type) {
      problems = problems.filter((problem) => {
        return problem.access.toLowerCase() === type;
      });
    }
  }

  const index = randomNumberGenerator(problems.length);
  const reqProblem = problems[index];
  const problemURL =
    "https://leetcode.com/problems/" + reqProblem.titleSlug + "/";

  const msgEmbed = createEmbed({
    title: "DSA Problem | LeetCode",
    thumbnail: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
    URL: problemURL,
    description: "Click on the Link to view the Problem",
    fields: [
      {
        name: "Problem Name",
        value: reqProblem.title,
        inline: false,
      },
      {
        name: "Difficulty",
        value: reqProblem.difficulty,
        inline: true,
      },
      {
        name: "Access",
        value: reqProblem.access,
        inline: true,
      },
    ],
  });

  message.channel.send({ embeds: [msgEmbed] }).then((message) => {
    message.react("<:variable:923241560232054804>");
  });
};

const leetcodeProblem = async (message, args) => {
  let problems = [];
  let totalProblemGenerated = 0;
  let command = args.shift();

  try {
    // Fetch Problems
    let response = await axios.get(leetCodeApiURL);

    if (command === "info") {
      // Total
      totalProblemGenerated = response.data.num_total;
      const embed = createEmbed({
        title: "LeetCode Info",
        URL: "https://leetcode.com/",
        thumbnail: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
        description:
          "Use `!var problem` to get a random DSA Question.\nCustomize Problem level with `!var problem <easy | medium | hard | free | paid>`",
        fields: [
          {
            name: "Total Number of Problems",
            value: `${totalProblemGenerated}`,
            inline: true,
          },
          {
            name: "Platform",
            value: "www.leetcode.com",
            inline: true,
          },
        ],
      });
      message.channel.send({ embeds: [embed] });
    } else {
      // Managing Problems
      response.data.stat_status_pairs.forEach((problem) => {
        const newProblem = new IndividualProblem(problem);
        problems.push(newProblem);
      });
      let type;
      if (command === "easy" || command === "medium" || command === "hard") {
        type = command;
        sendProblem(message, problems, "difficulty", type);
      } else if (command === "free" || command === "paid") {
        type = command;
        sendProblem(message, problems, "access", type);
      } else {
        sendProblem(message, problems, null);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = leetcodeProblem;
