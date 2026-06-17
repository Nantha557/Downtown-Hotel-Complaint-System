const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(

  {

    roomNo: String,

    category: String,

    complaint: String,

    description: String,

    priority: String,

    status: {
  type: String,
  enum: ["Pending", "On Hold", "Resolved"],
  default: "Pending",
},

holdReason: {
  type: String,
  default: "",
},

  },

  {

    timestamps: true,

  }

);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);