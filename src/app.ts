import dotnet from 'dotenv';
import express from 'express';
import { logErrorMiddleware, returnError } from './middlewares';
import { NotFoundError } from './exceptions/handler';
import cors from 'cors';
import { scheduler } from './helpers';
dotnet.config();
const app = express();

// cors: To Allow only specific list to sites, Empty to allow all
const allowedSites = [];
if (allowedSites.length > 0) app.use(cors({ origin: allowedSites }));
else app.use(cors());

app.use(express.json());
// Api Docs
app.use('/api-docs', function (req, res) {
  res.sendFile(`${__dirname}/doc/index.html`);
});
// Adding all routes
app.use('/', require('./routes/index'));
//
app.use(express.static('doc'));

// Exception Handling
app.use('*', (req, res, next) => {
  next(new NotFoundError());
});
app.use(logErrorMiddleware);
app.use(returnError);

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error, req, res, next) => {
  returnError(error, req, res, next);
});
// cron jobs
scheduler.init();
// server init
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
