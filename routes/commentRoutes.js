const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:blogId", protect, addComment);
router.get("/:blogId", getComments);

router.get("/test", (req, res) => {
  res.json({ message: "Comment routes are working" });
});

module.exports = router; // ✅ must be present