const { User } = require("../../models/users");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sgMail = require("../../helpers/sendGrid");
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

  await sgMail();

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
