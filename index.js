const {
  logErrorMiddleware,
  returnError,
} = require('./exceptions/exceptionHanlder');
const express = require('express');
const NotFoundError = require('./exceptions/notFoundError');
const app = express();
app.use(express.json());
app.get('/', async function (req, res) {
  res.json({
    status: 200,
    message: 'awesome app',
  });
});
app.use('/api-docs', function (req, res) {
  res.sendFile(`${__dirname}/doc/index.html`);
});

app.use('/', require('./routes/index'));

app.use(express.static('doc'));
app.use(express.static('public'));
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
