require("dotenv").config();

const outreachPipeline = require(
  "./pipeline/outreachPipeline"
);

(async () => {
  try {
    await outreachPipeline.run(
      "amazon.com"
    );
  } catch (err) {
    console.error(err);
  }
})();