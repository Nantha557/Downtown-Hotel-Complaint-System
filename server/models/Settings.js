const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({

  yellowTime: {
    type: Number,
    default: 20,
  },

  redTime: {
    type: Number,
    default: 30,
  },

  soundEnabled: {
    type: Boolean,
    default: true,
  },

  autoDeleteHours: {
    type: Number,
    default: 24,
  },

  hotelName: {
    type: String,
    default: "DownTown Hotel",
  },
  theme: {
  type: String,
  default: "light",
},
viewHours: {
  type: Number,
  default: 24,
},

});

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);