const DB = require('../models');
const { Op } = require('sequelize');
module.exports = {
  index: async (req, res, next) => {
    try {
      let user_id = req.params.id;
      let requests = await DB.Friend.findAll({
        where: { [Op.or]: [{ friendId: user_id }, { userId: user_id }] },
      });

      let f_ids = [user_id];
      requests.forEach((element) => {
        if (element.friendId == user_id) {
          f_ids.push(element.userId);
        } else {
          f_ids.push(element.friendId);
        }
      });
      const friends = await DB.User.findAll({
        where: {
          id: {
            [Op.in]: f_ids,
          },
        },
      });

      return res.json({
        requests,
        friends,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      await DB.Friend.create({
        friendId: req.params.id,
        userId: req.authUser.id,
      });

      return res.json({
        status: true,
        data: { message: 'done' },
      });
    } catch (error) {
      next(error);
    }
  },

  accept: async (req, res, next) => {
    try {
      await DB.Friend.update(
        {
          satus: 'accept',
        },
        {
          where: {
            friendId: req.params.id,
            userId: req.authUser.id,
          },
        }
      );

      return res.json({
        status: true,
        data: { message: 'done' },
      });
    } catch (error) {
      next(error);
    }
  },

  reject: async (req, res, next) => {
    try {
      await DB.Friend.update(
        {
          satus: 'reject',
        },
        {
          where: {
            friendId: req.params.id,
            userId: req.authUser.id,
          },
        }
      );

      return res.json({
        status: true,
        data: { message: 'done' },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const result = await DB.Friend.destroy({
        where: {
          friendId: req.params.id,
          userId: req.authUser.id,
        },
      });
      return res.status(200).json({ status: true, deleted: result });
    } catch (error) {
      next(error);
    }
  },
};
