const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

// GET comments for a blog
router.get("/:blogId", async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a comment
router.post("/:blogId", protect, async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      blog: req.params.blogId,
      user: req.user._id,
    });
    const populated = await comment.populate("user", "name");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;