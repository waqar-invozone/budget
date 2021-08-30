'use strict';
import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { Op } from 'sequelize';
const DB = require('../models').User;
const router = Router();
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
      if (name !== 'auth') router.use('/' + name, require('./' + file).default);
      else router.use('/', require('./' + file).default);
    }
  });

export default router;
