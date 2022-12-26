const { User } = require("../../models/users");
const Conflict = require("http-errors");
const sendEmail = require("../../helpers/sendGrid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// const sgMail = require("../../helpers/sendGrid");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  const { password, email, subscription = "starter" } = req.body;

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: "kapustnikov@ukr.net",
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">verify your email</a>`,
  };

  await sendEmail(mail);

  try {
    res.status(201).json({
      status: "sucsess",
      code: 201,
      data: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
