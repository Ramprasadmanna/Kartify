import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// If We Export Function And Use In Sending Mail Logic This Will Invole this function on every mail send so avoiding this.
// const createMailTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: 587,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//     }
//   });
// }


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});




export default transporter;