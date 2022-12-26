const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SD_API_KEY } = process.env;

sgMail.setApiKey(SD_API_KEY);

const mail = {
  to: "kapustnikov@ukr.net",
  from: "oclock.kiev@gmail.com",
  subject: "Verification email",
  html: `<a href="">verify your email</a>`,
};

sgMail
  .send(mail)
  .then(() => console.log("succsess"))
  .catch((error) => console.log(error.messege));
