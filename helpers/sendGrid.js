const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SD_API_KEY } = process.env;

sgMail.setApiKey(SD_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "oclock.kiev@gmail.com" };

  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
