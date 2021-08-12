const DB = require('../models').User;
const { hash } = require('bcryptjs');
module.exports = {
  index: async (req, res) => {
    try {
      return res.json(
        await DB.findAll({
          attributes: { exclude: ['password', 'apiToken'] },
        })
      );
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
  store: async (req, res) => {
    try {
      let data = req.body;

      const user = await DB.create({
        username: data.username,
        email: data.email,
        password: await hash(data.password, 12),
        avator: null,
      });

      return res.json({ status: true, data: user });
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
  show: async (req, res) => {
    try {
      const user = await DB.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'apiToken'] },
      });
      if (exist)
        return res.json({
          status: true,
          data: exist,
        });
      else
        return next(
          new NotFoundError(`User with id:${req.params.id} not found.`)
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
      const id = req.params.id;
      const [result] = await DB.update(
        { username: data.username, email: data.email },
        { where: { id } }
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
      const id = req.params.id;
      const result = await DB.destroy({
        where: { id },
      });
      return res.status(200).json({ status: true, deleted: result });
    } catch (error) {
      next(error);
    } finally {
      await cleanUp();
    }
  },
};
