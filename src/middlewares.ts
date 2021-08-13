const { User } = require('./models');
import { logError } from './exceptions/handler';
export async function apiToken(req, res, next) {
  if (typeof req.body._token !== 'undefined') {
    const _token = req.body._token;
    const exist = await User.findOne({
      where: { apiToken: _token },
    });
    if (exist) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      message: 'Invalid Token',
    });
  }
  return res.status(401).json({
    status: 401,
    message:
      'This is protecetd route, Please provide a valid token in request.',
  });
}

export function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

export function returnError(err, req, res, next) {
  return res.json({
    status: err.statusCode || 500,
    message: err.message || 'Some thing went wrong',
  });
}

export default { apiToken, logErrorMiddleware, returnError };
