const router = require('express').Router();
const { middleware } = require('../middlewares/api-token');
const UserController = require('../controllers/users');
router.use(middleware);

router.get('/', UserController.index);

router.post('/', UserController.store);

router.get('/:id', UserController.show);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

/** 
router.post('/upload-image', multer.single('image'), async (req, res) => {
  let filePath = null;
  if (req.file) {
    helper.uploadImageToStorage(req.file, bucket).then((value) => {
      res.send(value);
    });
    return;
  }
  return res.status(400).send('File not found');
});

router.put('/set-image/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await DB.update(
      { image: req.body.file_path },
      { where: { id } }
    );
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});
*/

module.exports = router;
