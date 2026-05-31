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

const updateComplaintStatus = async (req, res) => {

  try {

    const complaint = await Complaint.findByIdAndUpdate(

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

    console.log(error);

    res.status(500).json({

      error: "Failed to update complaint",

    });

  }

};

module.exports = {

  getComplaints,

  updateComplaintStatus,

};