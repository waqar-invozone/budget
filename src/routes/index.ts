'use strict';
import fs from 'fs';
import path from 'path';
const express = require('express');
const router = express.Router();
const basename = path.basename(__filename);
let name;
let ingore = [];
fs.readdirSync(__dirname)
  .filter((file) => {
    let ext = file.slice(-3);
    return file !== basename && ext === '.js';
  })
  .forEach((file) => {
    if (!ingore.includes(file)) {
      name = file.replace('.js', '');
      if (name !== 'auth') router.use('/' + name, require('./' + file));
      else router.use('/', require('./' + file));
    }
  });

module.exports = router;
