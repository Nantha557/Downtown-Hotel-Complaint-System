const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "Supervisor", "Housekeeping", "Maintenance"],
    required: true,
  },

});

module.exports = mongoose.model("User", userSchema);