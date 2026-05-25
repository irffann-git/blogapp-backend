const express = require("express");
const {
  createBlog,
  getBlogs,
  getMyBlogs,
  getSingleBlog,
  addView,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/",              getBlogs);
router.get("/myblogs",       protect, getMyBlogs);
router.get("/:id",           getSingleBlog);
router.put("/:id/view",      addView);
router.post("/",             protect, upload.single("image"), createBlog);
router.put("/:id",           protect, upload.single("image"), updateBlog); // added upload middleware
router.delete("/:id",        protect, deleteBlog);

module.exports = router;