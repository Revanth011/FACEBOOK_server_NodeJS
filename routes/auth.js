const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.patch("/verifyEmail/:token", verifyEmail);

module.exports = router;
