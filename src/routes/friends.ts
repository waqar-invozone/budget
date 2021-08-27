const Controller = require('../controllers/friends');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/:user_id', Controller.index);

// router.post('/', Controller.store);

// router.get('/:id', Controller.show);

// router.put('/:id', Controller.update);

// router.delete('/:id', Controller.delete);

export default router;
