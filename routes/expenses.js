const router = require('express').Router();
const { middleware } = require('../middlewares/api-token');
const ExpenseController = require('../controllers/expenses');
router.use(middleware);

router.get('/', ExpenseController.index);

router.post('/', ExpenseController.store);

router.get('/:id', ExpenseController.show);

router.put('/:id', ExpenseController.update);

router.delete('/:id', ExpenseController.delete);

module.exports = router;
