const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedObj = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedObj.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  userAuth,
};
