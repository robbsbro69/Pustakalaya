const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, message: "Signup Successful!!!!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { id: user._id, emailId: user.emailId },
      process.env.JWT,
      {
        expiresIn: "1d",
      }
    );
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = authRouter;
