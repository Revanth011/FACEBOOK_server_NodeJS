const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}

async function createHash(pwd) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pwd, salt);
  return password;
}

async function comparePassword(userPassword, password) {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
}

module.exports = { createJWT, createHash, comparePassword };
