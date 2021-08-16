const UserController = require('../controllers/users');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/', UserController.index);

router.post('/', UserController.store);

router.get('/:id', UserController.show);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

export default router;
