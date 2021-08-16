module.exports = {
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || '587',
  auth: {
    user: process.env.MAIL_USERNAME || 'username',
    pass: process.env.MAIL_PASSWORD || '',
  },
};
