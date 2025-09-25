const express = require("express");
const { createPost, getPosts, updatePost, deletePost, getPostsCount } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/count", getPostsCount);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
