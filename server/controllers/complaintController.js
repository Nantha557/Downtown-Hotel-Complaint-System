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

// CREATE NEW COMPLAINT

const createComplaint = async (req, res) => {

  try {

    const {

      roomNo,

      category,

      complaint,

      description,

    } = req.body;

    const newComplaint =
      await Complaint.create({

        roomNo,

        category,

        complaint,

        description,

        status: "Pending",

      });

      

    res.status(201).json(
      newComplaint
    );

    

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to create complaint",

    });

    const newComplaint =
  await Complaint.create({
    roomNo,
    category,
    complaint,
    description,
    status: "Pending",
  });

console.log(
  "NEW COMPLAINT:",
  newComplaint
);

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

// PUT ON HOLD

const putOnHold = async (req, res) => {

  try {

    const complaint =
      await Complaint.findByIdAndUpdate(

        req.params.id,

        {

          status: "On Hold",

          holdReason:
            req.body.reason,

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

  createComplaint,

  markResolved,

  putOnHold,

};