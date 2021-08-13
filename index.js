require('dotenv').config();
const {
  logErrorMiddleware,
  returnError,
} = require('./exceptions/exceptionHanlder');
const express = require('express');
const NotFoundError = require('./exceptions/notFoundError');
const cors = require('./middlewares/cors');
const scheduler = require('./helpers/scheduler');

const app = express();
app.use(cors);
app.use(express.json());

// Api Docs
app.use('/api-docs', function (req, res) {
  res.sendFile(`${__dirname}/doc/index.html`);
});
// Adding all routes
app.use('/', require('./routes/index'));
//
app.use(express.static('doc'));
app.use(express.static('public'));
// Exception Handling
app.use('*', (req, res, next) => {
  next(new NotFoundError(`'${req.originalUrl}' route not found.`));
});
app.use(logErrorMiddleware);
app.use(returnError);
process.on('unhandledRejection', (error) => {
  throw error;
});
process.on('uncaughtException', (error) => {
  returnError(error);
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
// cron jobs
scheduler.init();
// server init
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
