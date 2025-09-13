const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
