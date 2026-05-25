const Comment = require("../models/Comment");


// ADD COMMENT
const addComment = async (req, res) => {
  try {

    const comment = await Comment.create({
      text: req.body.text,
      user: req.user._id,
      blog: req.params.blogId,
    });

    const populatedComment =
      await Comment.findById(comment._id)
        .populate("user", "name");

    res.status(201).json(populatedComment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET COMMENTS
const getComments = async (req, res) => {
  try {

    const comments =
      await Comment.find({
        blog: req.params.blogId,
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addComment,
  getComments,
};