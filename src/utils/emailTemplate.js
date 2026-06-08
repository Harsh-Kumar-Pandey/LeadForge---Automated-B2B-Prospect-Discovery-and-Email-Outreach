function generateColdEmail(lead) {
  return {
    subject: `Quick question regarding ${lead.company}`,

    htmlContent: `
      <p>Hi ${lead.name},</p>

      <p>
      I came across ${lead.company} and noticed your role as
      ${lead.title}.
      </p>

      <p>
      We help companies identify and engage with qualified prospects
      automatically.
      </p>

      <p>
      Would you be open to a short conversation?
      </p>

      <p>
      Regards,<br/>
      Harsh
      </p>
    `,
  };
}

module.exports = generateColdEmail;