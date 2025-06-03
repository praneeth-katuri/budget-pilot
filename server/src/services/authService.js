const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/generateToken");
const User = require("../models/User");
const config = require("../config");

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatch = user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Invalid Password");
    error.status = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return { user, accessToken, refreshToken };
};

const register = async ({ username, email, password }) => {
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  const user = await User.create({ username, email, password });
  return user;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Token not found");
    error.status = 401;
    throw error;
  }

  const decoded = verifyToken(refreshToken, config.jwt.refreshSecret);

  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("Invalid Token");
    error.status = 401;
    throw error;
  }
  const accessToken = generateAccessToken(user._id);

  return { accessToken, user };
};

module.exports = {
  login,
  register,
  refresh,
};
