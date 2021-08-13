import winston from 'winston';

export const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console(),
  ],
});

export function logError(err) {
  logger.error(err);
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(description: string = '') {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = 404;
    this.message = 'Not Found';
    this.name = 'Lost';
    Error.captureStackTrace(this);
  }
}

export default {
  logError,
  NotFoundError,
  logger,
};
