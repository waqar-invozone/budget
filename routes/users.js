const router = require('express').Router();
const DB = require('../models').User;

router.get('/', async (req, res) => res.json(await DB.findAll()));

router.post('/', async (req, res) => {
  try {
    let data = req.body;
    const user = await DB.create({
      name: data.name,
      email: data.email,
      password: data.password,
      image: null,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status('500').send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await DB.findByPk(req.params.id);
    if (user) return res.json(user);
    else return res.status(404).send('Not Found');
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    let data = req.body;
    const id = req.params.id;
    const [result] = await DB.update(
      { name: data.name, email: data.email },
      { where: { id } }
    );
    return res.json({ updated: result });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DB.destroy({
      where: { id },
    });
    return res.status(200).json({ deleted: result });
  } catch (error) {
    return res.status(500).send('Some server error');
  }
});

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
