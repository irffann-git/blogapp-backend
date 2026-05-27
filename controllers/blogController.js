const Blog = require("../models/Blog");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    let image = {};

    if (req.file) {
      image = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      };
    }

    const blog = await Blog.create({
      title,
      description,
      category,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Blog Created Successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BLOGS
const getBlogs = async (req, res) => {
  try {

    const search = req.query.search || "";

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET SINGLE BLOG
const getSingleBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id)
      .populate("user", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ADD VIEW
const addView = async (req, res) => {
  try {

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("user", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const { title, description, category } = req.body;

    const updates = {
      title,
      description,
      category,
    };

    if (req.file) {
      updates.image = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Blog Updated Successfully",
      updatedBlog,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET MY BLOGS
const getMyBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  addView,
  updateBlog,
  deleteBlog,
  getMyBlogs,
};