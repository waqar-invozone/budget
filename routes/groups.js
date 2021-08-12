const router = require('express').Router();
const { middleware } = require('../middlewares/api-token');
const GroupController = require('../controllers/groups');
router.use(middleware);

router.get('/', GroupController.index);

router.post('/', GroupController.store);

router.get('/:id', GroupController.show);

router.put('/:id', GroupController.update);

router.delete('/:id', GroupController.delete);

router.post('/user/:group_id/:user_id', GroupController.addUser);

router.delete('/user/:group_id/:user_id', GroupController.removeUser);

module.exports = router;
