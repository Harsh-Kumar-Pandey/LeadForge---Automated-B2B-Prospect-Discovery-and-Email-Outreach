const axios = require("axios");

class BrevoService {
  constructor() {
    this.client = axios.create({
      baseURL: "https://api.brevo.com/v3",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async sendEmail(lead, template) {
    try {
      const response = await this.client.post(
        "/smtp/email",
        {
          sender: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDER_EMAIL,
          },
          

          to: [
            {
              email: lead.email,
              name: lead.name,
            },
          ],
          

         replyTo: {
          email: "yourpersonal@gmail.com",
             name: "Harsh Pandey"
            },

          subject: template.subject,
          htmlContent: template.htmlContent,
        }
      );

      console.log(
        `[brevo.service] Email sent to ${lead.email}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "[brevo.service] Error:",
        error.response?.data || error.message
      );

      return null;
    }
  }
}

module.exports = new BrevoService();