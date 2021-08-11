const DB = require('../models').User;
const { hash } = require('bcryptjs');
module.exports = {
  index: async (req, res) =>
    res.json(
      await DB.findAll({
        attributes: { exclude: ['password', 'apiToken'] },
      })
    ),
  store: async (req, res) => {
    try {
      let data = req.body;

      const user = await DB.create({
        username: data.username,
        email: data.email,
        password: await hash(data.password, 12),
        avator: null,
      });

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status('500').send(error);
    }
  },
  show: async (req, res) => {
    try {
      const user = await DB.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'apiToken'] },
      });
      if (user) return res.json(user);
      else return res.status(404).send('Not Found');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
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
      return res.json({ updated: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await DB.destroy({
        where: { id },
      });
      return res.status(200).json({ deleted: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Some server error');
    }
  },
};
