const express = require("express");
const multer = require("multer");

const filesHandlers = require("../controllers/uploadToS3");
const S3Router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

S3Router.post("/upload", upload.single("file"), filesHandlers.uploadFile);
S3Router.delete("/delete", filesHandlers.deleteFile);

module.exports = S3Router;