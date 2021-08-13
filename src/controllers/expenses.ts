const models = require('../models');
const DB = models.Expense;
const eventEmitter = require('../helpers/events');

import { NotFoundError } from '../exceptions/handler';
import { uploader } from '../helpers';

module.exports = {
  index: async (req, res, next) => {
    try {
      return res.json(await DB.findAll());
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      let data = req.body;
      const expense = await DB.create({
        type: data.type,
        amount: data.amount,
        description: data.description,
        createdBy: data.createdBy,
      });
      // for practice emit an event to email
      eventEmitter.emit('expenseCreated', expense);
      return res.json({
        status: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const exist = await DB.findByPk(req.params.id);
      if (exist)
        return res.json({
          status: true,
          data: exist,
        });
      else
        return next(
          new NotFoundError(`Expense with id:${req.params.id} not found.`)
        );
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let data = req.body;
      const [result] = await DB.update(
        {
          type: data.type,
          amount: data.amount,
          description: data.description,
          createdBy: data.createdBy,
        },
        { where: { id: req.params.id } }
      );
      return res.json({ status: true, updated: result });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await DB.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ status: true, deleted: result });
    } catch (error) {
      next(error);
    }
  },
  uploadFiles: async (req, res, next) => {
    try {
      let output = [];
      if (req.files.lenngth > 0)
        for (let i = 0; i <= req.files.lenngth; i++) {
          output.push(
            await models.ExpenseAttachment.create({
              filePath: await uploader(req.files[i]),
              expenseId: req.params.id,
            })
          );
        }

      return res.json({
        status: true,
        message: 'Attachments uploaded successfully.',
        data: output,
      });
    } catch (error) {
      next(error);
    }
  },
};
