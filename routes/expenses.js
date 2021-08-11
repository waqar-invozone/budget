const router = require('express').Router();
const { middleware } = require('../middlewares/api-token');
const ExpenseController = require('../controllers/expenses');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    // no larger than 5mb, you can change as needed.
    fileSize: 5 * 1024 * 1024,
  },
});

router.use(middleware);

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

module.exports = router;
