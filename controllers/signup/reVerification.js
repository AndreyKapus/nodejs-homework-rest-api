const { User } = require("../../models/users");
const { BadRequest } = require("http-errors");
const sendGrid = require("../../helpers/sendGrid");

const reVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("missing required field email");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">verify your email</a>`,
  };
  await sendGrid(mail);
  res.status(200).json({
    message: "Verification email sent",
    status: "sucsess",
    code: 201,
    data: {
      email,
      verificationToken,
    },
  });
};

module.exports = reVerification;
