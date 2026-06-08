const express = require("express");

const router = express.Router();

const {

  login,
  register,
  getUsers,
  updateUserRole,
  deleteUser,

} = require("../controllers/authController");

router.post("/login", login);


router.post(
  "/register",
  register
);

router.get("/users", getUsers);

router.put(
  "/users/:id",
  updateUserRole
);

router.delete(
  "/users/:id",
  deleteUser
);

module.exports = router;