const nodemailer = require("nodemailer");
const htmlToFormattedText = require("html-to-formatted-text");

module.exports = (process_env) => {
  const mailTransport = nodemailer.createTransport({
    host: process_env.SENDGRID_HOST_SERVER,
    auth: {
      user: "apikey",
      pass: process_env.SENDGRID_API_KEY,
    },
  });

  const from = '"JavaTechnovation" <technovationincubation@gmail.com>';
  // const errorRecipient = "technovationincubation@gmail.com";

  return {
    send: (to, subject, html) =>
      mailTransport.sendMail({
        from,
        to,
        subject,
        html,
        text: htmlToFormattedText(html),
      }),
  };
};
