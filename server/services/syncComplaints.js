const { google } = require("googleapis");

const Complaint = require("../models/complaint");

const auth = new google.auth.GoogleAuth({

  keyFile: "service-account.json",

  scopes: ["https://www.googleapis.com/auth/spreadsheets"],

});

const sheets = google.sheets({

  version: "v4",

  auth,

});

const syncComplaints = async () => {

  try {

    // ================= IT =================

    const itResponse = await sheets.spreadsheets.values.get({

      spreadsheetId: "10iu_jTa7XdZjzP3UkJmzOO58qVUHKiv13Suj3_j__NI",

      range: "Form Responses 1!A:E",

    });

    const itRows = itResponse.data.values || [];

    for (const row of itRows.slice(1)) {

      const [

        timestamp,
        roomNo,
        issues,
        description,
        priority,

      ] = row;

      const existingComplaint = await Complaint.findOne({

        roomNo,
        complaint: issues,
        description,
        category: "IT",

      });

      // ONLY CREATE IF NOT EXISTS

      if (!existingComplaint) {

        await Complaint.create({

          roomNo,

          category: "IT",

          complaint: issues,

          description,

          priority,

          status: "Pending",

        });

        console.log("IT Complaint Added");

      }

    }

    // ================= HOUSEKEEPING =================

    const houseResponse = await sheets.spreadsheets.values.get({

      spreadsheetId: "16QHXcck_GM0xMcfH3IDkT-Vn2QkGWd3nIIyReZLcBB4",

      range: "Form Responses 1!A:E",

    });

    const houseRows = houseResponse.data.values || [];

    for (const row of houseRows.slice(1)) {

      const [

        timestamp,
        roomNo,
        issues,
        description,
        priority,

      ] = row;

      const existingComplaint = await Complaint.findOne({

        roomNo,
        complaint: issues,
        description,
        category: "Housekeeping",

      });

      if (!existingComplaint) {

        await Complaint.create({

          roomNo,

          category: "Housekeeping",

          complaint: issues,

          description,

          priority,

          status: "Pending",

        });

        console.log("Housekeeping Complaint Added");

      }

    }

    // ================= MAINTENANCE =================

    const maintenanceResponse = await sheets.spreadsheets.values.get({

      spreadsheetId: "1L4_qNH_ghlsUIbABkTdfC0O4M58RxyINBmSR_h5rMNY",

      range: "Form Responses 1!A:E",

    });

    const maintenanceRows = maintenanceResponse.data.values || [];

    for (const row of maintenanceRows.slice(1)) {

      const [

        timestamp,
        roomNo,
        issues,
        description,
        priority,

      ] = row;

      const existingComplaint = await Complaint.findOne({

        roomNo,
        complaint: issues,
        description,
        category: "Maintenance",

      });

      if (!existingComplaint) {

        await Complaint.create({

          roomNo,

          category: "Maintenance",

          complaint: issues,

          description,

          priority,

          status: "Pending",

        });

        console.log("Maintenance Complaint Added");

      }

    }

  } catch (error) {

    console.log("SYNC ERROR:", error);

  }

};

module.exports = syncComplaints;