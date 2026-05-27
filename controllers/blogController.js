const express = require("express");

const router = express.Router();

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  addView,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} = require("../controllers/blogController");

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

// CREATE BLOG
router.post(
  "/",
  protect,
  upload.single("image"),
  createBlog
);

// GET BLOGS
router.get("/", getBlogs);

// GET SINGLE BLOG
router.get("/:id", getSingleBlog);

// ADD VIEW
router.put("/:id/view", addView);

// UPDATE BLOG
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateBlog
);

// DELETE BLOG
router.delete(
  "/:id",
  protect,
  deleteBlog
);

// MY BLOGS
router.get(
  "/my/blogs",
  protect,
  getMyBlogs
);

module.exports = router;