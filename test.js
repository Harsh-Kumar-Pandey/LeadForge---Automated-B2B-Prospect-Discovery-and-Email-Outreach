require("dotenv").config();

const brevoService =
  require("./src/services/brevo.service");

  const generateEmailTemplate = require("./src/utils/emailTemplate");

(async () => {
  
const lead = {
  name: "John Doe",
  email: "harshkumarpandey123789@gmail.com",
  company: "Acme",
  title: "CEO",
};

const template =
  generateEmailTemplate(lead);

await brevoService.sendEmail(
  lead,
  template
);
})();
