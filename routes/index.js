'use strict';
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const basename = path.basename(__filename);
let name;
let ingore = [];
fs.readdirSync(__dirname)
  .filter((file) => {
    return file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    if (!ingore.includes(file)) {
      name = file.replace('.js', '');
      if (name !== 'auth') router.use('/' + name, require('./' + file));
      else router.use('/', require('./' + file));
    }
  });

module.exports = router;
