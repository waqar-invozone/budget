const DB = require('../models').Group;
module.exports = {
  index: async (req, res) => res.json(await DB.findAll()),
  store: async (req, res) => {
    try {
      let data = req.body;
      return res.json(
        await DB.create({
          name: data.name,
          createdBy: data.createdBy,
        })
      );
    } catch (error) {
      console.log(error);
      return res.status('500').send(error);
    }
  },
  show: async (req, res) => {
    try {
      const exist = await DB.findByPk(req.params.id);
      if (exist) return res.json(exist);
      else return res.status(404).send('Not Found');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  },
  update: async (req, res) => {
    try {
      let data = req.body;
      const [result] = await DB.update(
        {
          name: data.name,
          createdBy: data.createdBy,
        },
        { where: { id: req.params.id } }
      );
      return res.json({ updated: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  },
  delete: async (req, res) => {
    try {
      const result = await DB.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ deleted: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Some server error');
    }
  },
};
