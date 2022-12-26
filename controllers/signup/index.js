const register = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatars = require("./updateAvatars");
const verifyEmail = require("./verifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatars,
  verifyEmail,
};
