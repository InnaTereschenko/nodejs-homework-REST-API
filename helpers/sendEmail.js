const nodemailer = require('nodemailer');
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

// об'єкт налаштувань
const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: META_EMAIL,
        pass: META_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// об'єкт email для відправки
// const email = {
//     to: email,
//     from: META_EMAIL,
//     subject: 'Test email',
//     html: '<p>Привіт. Ми тестуємо надсилання листів!</p>',
// };

// const sendEmail = transport.sendEmail(email)
//     .then(() => console.log("Email send success"))
//     .catch(err => console.log(err.message));



    const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;