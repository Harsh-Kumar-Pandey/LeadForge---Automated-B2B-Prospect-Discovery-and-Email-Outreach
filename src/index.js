require("dotenv").config();

const readline = require("readline");
const outreachPipeline = require("./pipeline/outreachPipeline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter company domain: ", async (domain) => {
  try {
    await outreachPipeline.run(domain.trim());
  } catch (err) {
    console.error(err);
  } finally {
    rl.close();
  }
});