const express = require('express');
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
app.use('*', (req, res) => {
  res.json({
    status: 404,
    message: 'Not Found',
  });
});

// server init
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
