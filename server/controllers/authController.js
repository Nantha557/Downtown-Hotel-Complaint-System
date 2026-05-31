const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {

      return res.status(401).json({
        error: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        error: "Invalid password",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      "hotel_secret_key",

      {
        expiresIn: "7d",
      }

    );

    res.json({

      token,

      role: user.role,

      username: user.username,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login failed",
    });

  }

};

module.exports = {
  login,
};