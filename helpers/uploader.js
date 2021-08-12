const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config(require('../config/cloudinary'));

module.exports = async (file) => {
  let extension = file.originalname.split('.').pop();
  const filePath = `${__dirname}/temp.${extension}`;
  await fs.writeFileSync(filePath, file.buffer);
  const result = await cloudinary.v2.uploader.upload(filePath, {
    public_id: Date.now() + Date.now(),
  });
  await fs.unlinkSync(filePath);
  return result.url;
};
