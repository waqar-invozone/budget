const DB = require('../models');

import { NotFoundError } from '../exceptions/handler';

module.exports = {
  index: async (req, res, next) => {
    try {
      let user_id = req.params.user_id;
      let ids = await DB.Friend.findAll({
        where: { $or: [{ friendId: user_id }, { userId: user_id }] },
      });
      let f_ids = [];
      ids.forEach((element) => {
        if (element.friendId == user_id) {
          f_ids.push(element.userId);
        } else {
          f_ids.push(element.friendId);
        }
      });
      const friends = await DB.User.findAll({
        where: {
          id: {
            $in: f_ids,
          },
        },
      });

      return res.json(friends);
    } catch (error) {
      next(error);
    }
  },

  // store: async (req, res, next) => {
  //   try {
  //     let data = req.body;
  //     let group = await DB.create({
  //       name: data.name,
  //       createdBy: data.createdBy,
  //     });

  //     group.addUser(data.createdBy);

  //     return res.json({
  //       status: true,
  //       data: group,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // show: async (req, res, next) => {
  //   try {
  //     const exist = await DB.findByPk(req.params.id);
  //     if (exist)
  //       return res.json({
  //         status: true,
  //         data: exist,
  //       });
  //     else
  //       return next(
  //         new NotFoundError(`Group with id:${req.params.id} not found.`)
  //       );
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // update: async (req, res, next) => {
  //   try {
  //     let data = req.body;
  //     const [result] = await DB.update(
  //       {
  //         name: data.name,
  //         // createdBy: data.createdBy,
  //       },
  //       { where: { id: req.params.id } }
  //     );
  //     return res.json({ status: true, updated: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // delete: async (req, res, next) => {
  //   try {
  //     const result = await DB.destroy({
  //       where: { id: req.params.id },
  //     });
  //     return res.status(200).json({ status: true, deleted: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // addUser: async (req, res, next) => {
  //   try {
  //     return res.json({ status: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // removeUser: async (req, res, next) => {
  //   try {
  //     return res.json({ status: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
