const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const register = async (req, res) => {

  try {

    const {
      username,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({
        username,
      });

    if (existingUser) {

      return res.status(400).json({
        message:
          "Username already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({

        username,

        password:
          hashedPassword,

        role,

      });

    res.status(201).json({

      message:
        "User created successfully",

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Registration failed",

    });

  }

};

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
  register,
};