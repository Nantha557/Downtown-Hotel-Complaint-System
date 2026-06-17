require("dotenv").config();

const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const connectDB = require("./config/db");
//const syncComplaints = require("./services/syncComplaints");
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const Complaint = require("./models/complaint");
const Settings = require("./models/Settings");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api", testRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/settings", settingsRoutes);

// TEST ROUTE

app.get("/", (req, res) => {

  res.send("Server running");

});

const PORT = process.env.PORT || 5000;


app.get("/test-hold", (req, res) => {
  res.send("hold route version");
});

// SYNC WHATSAPP COMPLAINTS

// setInterval(() => {

//   syncComplaints();

// }, 5000);

// AUTO DELETE RESOLVED COMPLAINTS

// setInterval(async () => {

//   try {

//     // GET SETTINGS

//     const settings = await Settings.findOne();

//     // DEFAULT 24 HOURS

//     const deleteHours = settings?.autoDeleteHours || 24;

//     // CALCULATE DELETE TIME

//     const deleteTime = new Date(

//       Date.now() -

//       deleteHours * 60 * 60 * 1000

//     );

//     // DELETE OLD RESOLVED COMPLAINTS

//     await Complaint.deleteMany({

//       status: "Resolved",

//       updatedAt: {

//         $lt: deleteTime,

//       },

//     });

//     console.log(

//       "Old resolved complaints deleted"

//     );

//   } catch (error) {

//     console.log(error);

//   }

// }, 60000);

// START SERVER

app.listen(PORT, "0.0.0.0", () => {

  console.log(

    `Server running on port ${PORT}`

  );

});