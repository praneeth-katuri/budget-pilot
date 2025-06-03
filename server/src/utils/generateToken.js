const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

const verifyToken = (token, tokenSecret) => {
  return jwt.verify(token, tokenSecret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
