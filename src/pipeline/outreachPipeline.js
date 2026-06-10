const leadGenerationService = require(
  "../services/leadGeneration.service"
);

const brevoService = require(
  "../services/brevo.service"
);

const generateEmailTemplate = require(
  "../utils/emailTemplate"
);

const readline = require("readline");


class OutreachPipeline {
  
  async run(seedDomain) {
    try {
      console.log(
        `[outreachPipeline] Starting pipeline for ${seedDomain}`
      );

      const leads =
        await leadGenerationService.generateLeads(
          seedDomain
        );

      console.log(
        `[outreachPipeline] ${leads.length} leads generated`
      );

      console.log("[outreachPipeline] Selected leads :", leads);
      console.log(
        "[outreachPipeline] Sending emails to leads..."
      );

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const askQuestion = (question) => {
        return new Promise((resolve) => {
          rl.question(question, (answer) => {
            resolve(answer);
          });
        });
      };

      let count = 0;

        for (const lead of leads) {
          console.log("\n--------------------------------");
          console.log(`Name  : ${lead.name}`);
          console.log(`Email : ${lead.email}`);
          console.log(`Title : ${lead.title || "N/A"}`);
          console.log("--------------------------------");

          const answer = await askQuestion(
            `Send email to ${lead.name}? (yes/no): `
          );

        if (answer.trim().toLowerCase() !== "yes") {
          console.log(
            `[outreachPipeline] Skipping ${lead.email}`
          );
          continue;
        }

        console.log(
          `[outreachPipeline] Sending email to ${lead.name} (${lead.email})`
        );

        const template = generateEmailTemplate(lead);

        await brevoService.sendEmail(
          lead,
          template
        );

        count++;

        console.log(
          `[outreachPipeline] Email sent to ${lead.email}`
        );

  

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );
}

rl.close();
      

      console.log(
        "[outreachPipeline] Pipeline completed successfully"
      );
      console.log(
        `[outreachPipeline] Total emails sent: ${count}`
      );

      return {
        success: true,
        totalLeads: leads.length,
      };
    } catch (error) {
      console.error(
        "[outreachPipeline] Error:",
        error.message
      );

      throw error;
    }
  }
}

module.exports = new OutreachPipeline();