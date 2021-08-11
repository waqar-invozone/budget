const User = require('../models').User;

module.exports = {
  middleware: async function (req, res, next) {
    if (typeof req.body._token !== 'undefined') {
      const _token = req.body._token;
      const exist = await User.findOne({
        where: { apiToken: _token },
      });
      if (exist) {
        return next();
      }
      return res.status(401).send('Invalid Token');
    }
    return res
      .status(401)
      .send(
        'No token found in request, this route is protecetd please provide a valid token'
      );
  },
};
