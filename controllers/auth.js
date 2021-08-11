const bcrypt = require('bcryptjs');
const uploader = require('../helpers/uploader');
const { User } = require('../models');

module.exports = {
  login: async function (req, res) {
    let exist = await User.findOne({
      attributes: ['email', 'password', 'apiToken'],
      where: { email: req.body.email },
    });
    if (exist) {
      if ((await bcrypt.compare(req.body.password, exist.password)) === true) {
        return res.json({
          status: true,
          data: { apiToken: exist.apiToken },
        });
      }
      return res.json({
        status: false,
        message: 'Invalid password.',
      });
    }
    return res.json({
      status: false,
      message: 'No record found against this email.',
    });
  },

  register: async function (req, res) {
    let exist = await User.findOne({ where: { email: req.body.email } });
    if (exist) {
      return res.json({
        status: false,
        message: 'This email already taken.',
      });
    }
    let url = '';
    if (req.file) {
      url = await uploader(req.file);
    }
    return res.json({
      status: true,
      data: await User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        avatar: url,
      }),
    });
  },
};
