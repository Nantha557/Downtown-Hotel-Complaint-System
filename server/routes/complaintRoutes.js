const express = require("express");

const router = express.Router();

const {
  getComplaints,
  markResolved,
  putOnHold,
} = require("../controllers/complaintController");

router.get("/", getComplaints);

router.put("/:id/resolve", markResolved);

router.put("/:id/hold", putOnHold);

module.exports = router;