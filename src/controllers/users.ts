const { Op } = require('sequelize');
const DB = require('../models').User;
import { hash } from 'bcryptjs';
import { NotFoundError } from '../exceptions/handler';

module.exports = {
  index: async (req, res, next) => {
    try {
      return res.json(
        await DB.findAll({
          attributes: { exclude: ['password', 'apiToken'] },
        })
      );
    } catch (error) {
      next(error);
    }
  },
  store: async (req, res, next) => {
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
    }
  },
  show: async (req, res, next) => {
    try {
      const exist = await DB.findOne({
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
    }
  },
  update: async (req, res, next) => {
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
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await DB.destroy({
        where: { id },
      });
      return res.status(200).json({ status: true, deleted: result });
    } catch (error) {
      next(error);
    }
  },
};
