const leadGenerationService = require(
  "../services/leadGeneration.service"
);

const brevoService = require(
  "../services/brevo.service"
);

const generateEmailTemplate = require(
  "../utils/emailTemplate"
);


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

      let count = 0;
      for (const lead of leads) {
        console.log(
          `[outreachPipeline] Sending email to ${lead.name} (${lead.email})`
        );

        const template =
          generateEmailTemplate(lead);

        await brevoService.sendEmail(
          lead,
          template
        );

        console.log(
          `[outreachPipeline] Email sent to ${lead.email}`
        );

        count++;
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
      } 
      

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