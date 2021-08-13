const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(require('../config/mailHost'));

module.exports = async ({ name, email }, subject, message) => {
  return await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: `"${name}" <${email}>`,
    subject: subject,
    text: message,
  });
};
