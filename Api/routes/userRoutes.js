const express = require("express");
const {
  userLogin,
  userRegister,
  userLogout,
  checkProfile,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

//User Register Route
router.post("/register", userRegister);

//Login Route
router.post("/login", userLogin);

//Logout Route
router.get("/logout", userLogout);

//Refresh Route
router.get("/profile", checkProfile);

//Update User
router.put("/updateProfile", updateUser);

module.exports = router;