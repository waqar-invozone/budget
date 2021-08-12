/**
 * Configurations of logger.
 */

const winston = require('winston');

const logger = winston.createLogger({
  name: 'error.log',
  level: 'error',
  format: winston.format.json(),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;

/**
 * With winstonRotator
 */

//  const winston = require('winston');
//  const winstonRotator = require('winston-daily-rotate-file');

//  const consoleConfig = [
//    new winston.transports.Console({
//      'colorize': true
//    })
//  ];

//  const createLogger = new winston.Logger({
//    'transports': consoleConfig
//  });

//  const successLogger = createLogger;
//  successLogger.add(winstonRotator, {
//    'name': 'access-file',
//    'level': 'info',
//    'filename': './logs/access.log',
//    'json': false,
//    'datePattern': 'yyyy-MM-dd-',
//    'prepend': true
//  });

//  const errorLogger = createLogger;
//  errorLogger.add(winstonRotator, {
//    'name': 'error-file',
//    'level': 'error',
//    'filename': './logs/error.log',
//    'json': false,
//    'datePattern': 'yyyy-MM-dd-',
//    'prepend': true
//  });

//  module.exports = {
//    'successlog': successLogger,
//    'errorlog': errorLogger
//  };
