import fs from 'fs';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
const { logger } = require('./exceptions/handler');
const cloudinary = require('cloudinary');

cloudinary.config(require('../config/cloudinary'));
const transporter = nodemailer.createTransport(require('../config/mailHost'));

export const uploader = async function (file): Promise<string> {
  let extension = file.originalname.split('.').pop();
  const filePath = `${__dirname}/temp.${extension}`;
  await fs.writeFileSync(filePath, file.buffer);
  const result = await cloudinary.v2.uploader.upload(filePath, {
    public_id: Date.now() + Date.now(),
  });
  await fs.unlinkSync(filePath);
  return result.url;
};

export async function sendEmail(
  { name, email },
  subject: string,
  message: string
): Promise<any> {
  return await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: `"${name}" <${email}>`,
    subject: subject,
    text: message,
  });
}

export const scheduler = {
  dailyEmail() {
    cron.schedule('* 10 * * *', async () => {
      try {
        return await sendEmail(
          { name: 'test', email: 'test@example.com' },
          'Daily email',
          'Working great'
        );
      } catch (error) {
        logger.error(error);
        return;
      }
    });
  },

  init() {
    this.dailyEmail();
  },
};

export default { scheduler, uploader, sendEmail };
