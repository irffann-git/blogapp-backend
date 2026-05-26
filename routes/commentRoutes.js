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

// LIKE / UNLIKE COMMENT
router.put("/:commentId/like", protect, async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const alreadyLiked = comment.likes.includes(req.user._id);

    if (alreadyLiked) {

      comment.likes = comment.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

    } else {

      comment.likes.push(req.user._id);

    }

    await comment.save();

    res.status(200).json({
      message: alreadyLiked
        ? "Comment unliked"
        : "Comment liked",
      likes: comment.likes.length,
      liked: !alreadyLiked,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;