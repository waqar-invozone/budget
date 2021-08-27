const { User } = require('./models');
import { logError } from './exceptions/handler';
export async function apiToken(req, res, next) {
  if (typeof req.headers.token !== 'undefined') {
    const token = req.headers.token;
    const exist = await User.findOne({
      where: { apiToken: token },
    });
    if (exist) {
      req['authUser'] = exist;
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

export function returnError(error, req, res, next) {
  try {
    return res.json({
      status: error.statusCode || 500,
      message: error.message || 'Some thing went wrong',
    });
  } catch (er) {}
}

export default { apiToken, logErrorMiddleware, returnError };
