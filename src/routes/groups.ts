const GroupController = require('../controllers/groups');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/', GroupController.index);

router.post('/', GroupController.store);

router.get('/:id', GroupController.show);

router.put('/:id', GroupController.update);

router.delete('/:id', GroupController.delete);

router.post('/user/:group_id/:user_id', GroupController.addUser);

router.delete('/user/:group_id/:user_id', GroupController.removeUser);

export default router;
