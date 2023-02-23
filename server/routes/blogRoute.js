const router = require("express").Router();
const Blog = require("../models/blogsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add new blog
router.post("/add-blog", authMiddleware, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.send({
      message: "Blog added successfully",
      data: newBlog,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all blogs
router.get("/get-all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");
    res.send({
      message: "Blogs fetched successfully",
      data: blogs,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get blog by id
router.get("/get-blog-by-id/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    res.send({
      message: "Blogs fetched successfully",
      data: blog,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// update blog
router.put("/update-blog", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      message: "Blog updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// delete blog
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
