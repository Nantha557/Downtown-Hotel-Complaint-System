require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  const users = [

    {
      username: "admin",
      password: "admin123",
      role: "admin",
    },

    {
      username: "itstaff",
      password: "it123",
      role: "IT",
    },

    {
      username: "house",
      password: "house123",
      role: "Housekeeping",
    },

    {
      username: "maint",
      password: "maint123",
      role: "Maintenance",
    },

  ];

  for (const user of users) {

    const existingUser = await User.findOne({
      username: user.username,
    });

    if (!existingUser) {

      const hashedPassword = await bcrypt.hash(
        user.password,
        10
      );

      await User.create({

        username: user.username,

        password: hashedPassword,

        role: user.role,

      });

      console.log(`${user.username} created`);

    } else {

      console.log(`${user.username} already exists`);

    }

  }

  mongoose.disconnect();

})

.catch((error) => {

  console.log(error);

});