const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    res.status(404).send("Connection Failed");
  }
};

module.exports = connectDB;
