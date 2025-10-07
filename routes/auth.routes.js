const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.model");
const { userAuth } = require("../middleware/user.middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

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
    if (!emailId || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }
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
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out" });
});

authRouter.get("/user", userAuth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

authRouter.put("/user/:id", userAuth, async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({
      success: true,
      message: "Updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Updation Failed",
    });
  }
});

module.exports = authRouter;
