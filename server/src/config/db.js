const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.dbUri);
    console.log("Connection to DB successful");
  } catch (err) {
    console.error("Connection to DB failed");
    process.exit(1);
  }
};

module.exports = connectDB;
