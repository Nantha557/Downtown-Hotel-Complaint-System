const express = require("express");

const router = express.Router();

const {

  getComplaints,

  createComplaint,

  markResolved,

  putOnHold,

} = require("../controllers/complaintController");

router.get("/", getComplaints);

router.post(
  "/create",
  createComplaint
);

router.put(
  "/:id/resolve",
  markResolved
);

router.put(
  "/:id/onhold",
  putOnHold
);

module.exports = router;