const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  try {
    const { fullName, emailId, password } = req.body;
    const user = new User({
      fullName,
      emailId,
      password,
    });

    await user.save();
    res.status(200).send("Signup Successful!!!!");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
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
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = authRouter;
