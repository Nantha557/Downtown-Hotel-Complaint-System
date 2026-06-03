const Complaint = require("../models/complaint");

// GET ALL COMPLAINTS

const getComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find().sort({

      createdAt: -1,

    });

    res.json(complaints);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to fetch complaints",

    });

  }

};

// MARK RESOLVED

const markResolved = async (req, res) => {

  try {

    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          status: "Resolved",
        },
        {
          new: true,
        }
      );

    res.json(complaint);

  } catch (error) {

    res.status(500).json({
      error: "Failed",
    });

  }

};
const putOnHold = async (req, res) => {

  try {

    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          status: "On Hold",
          holdReason: req.body.reason,
        },
        {
          new: true,
        }
      );

    res.json(complaint);

  } catch (error) {

    res.status(500).json({
      error: "Failed",
    });

  }

};

module.exports = {

  getComplaints,

  markResolved,

  putOnHold,

};