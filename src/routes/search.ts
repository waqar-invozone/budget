const UserController = require('../controllers/users');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/users/:slug', UserController.search);

export default router;
