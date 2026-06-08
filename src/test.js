require("dotenv").config();

const brevoService =
  require("./services/brevo.service");

  const generateEmailTemplate = require("./utils/emailTemplate");

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
