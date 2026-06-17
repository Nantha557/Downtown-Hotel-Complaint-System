const Settings = require("../models/Settings");

// GET SETTINGS

const getSettings = async (req, res) => {

  try {

    let settings = await Settings.findOne();

    // CREATE DEFAULT SETTINGS

    if (!settings) {

      settings = await Settings.create({});

    }

    res.json(settings);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to fetch settings",

    });

  }

};

// UPDATE SETTINGS

const updateSettings = async (req, res) => {

  try {

    let settings = await Settings.findOne();

    if (!settings) {

      settings = await Settings.create(req.body);

    } else {

      settings = await Settings.findByIdAndUpdate(

        settings._id,

        req.body,

        {

          new: true,

        }

      );

    }

    res.json(settings);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: "Failed to update settings",

    });

  }

};

module.exports = {

  getSettings,

  updateSettings,

};