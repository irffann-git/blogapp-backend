const express = require("express");

const { registerUser,loginUser,getProfile } = require("../controllers/authController");
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/update-profile", protect, updateProfile);

module.exports = router;