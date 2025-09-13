const Post = require("../models/post");

// Create Post
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
