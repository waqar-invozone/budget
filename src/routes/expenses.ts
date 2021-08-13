const ExpenseController = require('../controllers/expenses');
import { apiToken } from '../middlewares';
import express from 'express';
import Multer from 'multer';
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    // no larger than 5mb, you can change as needed.
    fileSize: 5 * 1024 * 1024,
  },
});

router.use(apiToken);

router.get('/', ExpenseController.index);

router.post('/', ExpenseController.store);

router.get('/:id', ExpenseController.show);

router.put('/:id', ExpenseController.update);

router.delete('/:id', ExpenseController.delete);

router.post(
  '/add-attachments/:id',
  multer.any(),
  ExpenseController.uploadFiles
);

export default router;
