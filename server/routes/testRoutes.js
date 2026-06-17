const express = require("express");
const router = express.Router();

const sheets = require("../services/googlesheets");
const Complaint = require("../models/complaint");

router.get("/sync-complaints", async (req, res) => {

  try {

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Form Responses 1!A:E",
    });

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return res.json({
        message: "No complaints found",
      });
    }

    const complaints = rows.slice(1);

    for (const row of complaints) {

      const [
        timestamp,
        roomNo,
        guestName,
        guestPhone,
        category,
        complaint,
      ] = row;

      const existingComplaint = await Complaint.findOne({
        roomNo,
        complaint,
      });

      if (!existingComplaint) {

        await Complaint.create({
          roomNo,
          guestName,
          guestPhone,
          category,
          complaint,
        });

      }

    }

    res.json({
      message: "Complaints synced successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to sync complaints",
    });

  }

});

module.exports = router;