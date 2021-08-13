const cron = require('node-cron');
const logger = require('../exceptions/logger');
const sendEmail = require('./mailer');

module.exports = {
  dailyEmail() {
    cron.schedule('* 10 * * *', async () => {
      try {
        await sendEmail(
          { name: 'test', email: 'test@example.com' },
          'Daily email',
          'Working great'
        );
      } catch (error) {
        logger.error(error);
      }
    });
  },

  init() {
    this.dailyEmail();
  },
};
