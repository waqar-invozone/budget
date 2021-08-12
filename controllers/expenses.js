const models = require('../models');
const DB = models.Expense;
const upload = require('../helpers/uploader');
const NotFoundError = require('../exceptions/notFoundError');

module.exports = {
  index: async (req, res) => {
    try {
      return res.json(await DB.findAll());
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
  store: async (req, res) => {
    try {
      let data = req.body;
      return res.json({
        status: true,
        data: await DB.create({
          type: data.type,
          amount: data.amount,
          description: data.description,
          createdBy: data.createdBy,
        }),
      });
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
  show: async (req, res) => {
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
    } finally {
      await cleanUp();
    }
  },
  update: async (req, res) => {
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
    } finally {
      await cleanUp();
    }
  },
  delete: async (req, res) => {
    try {
      const result = await DB.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ status: true, deleted: result });
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
  uploadFiles: async (req, res) => {
    try {
      let ouptut = [];
      if (req.files.lenngth > 0)
        for (let i = 0; i <= req.files.lenngth; i++) {
          output.push(
            await models.ExpenseAttachment.create({
              filePath: await upload(req.files[i]),
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
    } finally {
      await cleanUp();
    }
  },
};
