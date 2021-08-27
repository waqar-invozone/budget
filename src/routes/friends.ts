const Controller = require('../controllers/friends');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/', Controller.index);

router.post('/', Controller.store);

router.get('/:id', Controller.show);

router.put('/:id', Controller.update);

router.delete('/:id', Controller.delete);

router.post('/user/:group_id/:user_id', Controller.addUser);

router.delete('/user/:group_id/:user_id', Controller.removeUser);

export default router;
