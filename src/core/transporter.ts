import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'support@mevoc.com',
    pass: 'password',
  },
});
