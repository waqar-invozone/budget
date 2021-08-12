const {
  logErrorMiddleware,
  returnError,
} = require('./exceptions/exceptionHanlder');
const express = require('express');
const NotFoundError = require('./exceptions/notFoundError');
const cors = require('./middlewares/cors');
const app = express();
app.use(express.json());

app.use(cors);

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
// server init
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
