const express = require('express');
const app = express();

app.get('/', async function (req, res) {
  return res.send('Very Nice!');
});

app.use('/', require('./routes/index'));
// server init
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
