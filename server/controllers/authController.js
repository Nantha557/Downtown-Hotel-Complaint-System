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

  console.log("REGISTER ERROR:");
  console.log(error);

  res.status(500).json({
    error: error.message,
    stack: error.stack,
  });

}

};


// GET ALL USERS
const getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch users",
    });

  }

};

// UPDATE ROLE
const updateUserRole = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(

      req.params.id,

      {
        role: req.body.role,
      },

      {
        new: true,
      }

    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update role",
    });

  }

};

// DELETE USER
const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed",
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
  getUsers,
  updateUserRole,
  deleteUser,
};