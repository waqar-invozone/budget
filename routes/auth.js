const router = require('express').Router();
const AuthController = require('../controllers/auth');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    // no larger than 5mb, you can change as needed.
    fileSize: 5 * 1024 * 1024,
  },
});
router.post('/login', AuthController.login);
router.post('/register', multer.single('image'), AuthController.register);

module.exports = router;
