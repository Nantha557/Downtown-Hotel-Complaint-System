const express = require("express");

const router = express.Router();

const {

  getComplaints,

  updateComplaintStatus,

} = require("../controllers/complaintController");

router.get("/", getComplaints);

router.put("/:id", updateComplaintStatus);

module.exports = router;