const Controller = require('../controllers/friends');
import { apiToken } from '../middlewares';
import express from 'express';

const router = express.Router();
router.use(apiToken);

router.get('/:id', Controller.index);

router.post('/add/:id', Controller.store);

router.post('/accept/:id', Controller.accept);

router.post('/reject/:id', Controller.reject);

router.delete('/:id', Controller.reject);

// router.get('/:id', Controller.show);

// router.put('/:id', Controller.update);

// router.delete('/:id', Controller.delete);

export default router;
