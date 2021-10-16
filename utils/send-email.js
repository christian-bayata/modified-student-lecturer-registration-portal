const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD 
        }
      });

    var message = {
        from: `${process.env.SMTP_NAME_FROM} <${process.env.SMTP_EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message);
};

module.exports = sendEmail;
