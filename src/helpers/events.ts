const { User } = require('../models');
import { logger } from '../exceptions/handler';
import { sendEmail } from '../helpers';
import EventEmitter from 'events';
// Making instance of emitter
class MyEmitter extends EventEmitter {}
const eventEmitter = new MyEmitter();

// Add events
eventEmitter.on('expenseCreated', async function (expense) {
  try {
    const creator = await User.findByPk(expense.createdBy);
    if (creator) {
      await sendEmail(
        { name: creator.username, email: creator.email },
        'New Expense Added',
        `Hy ${creator.username}! <br>
         A new expense '${expense.type}' is record by amount ${expense.amount}.
        `
      );
    }
  } catch (err) {
    logger.error(err);
  }
});
module.exports = eventEmitter;
