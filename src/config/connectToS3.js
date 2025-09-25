const AWS = require("aws-sdk");

let s3;

const connectToS3 = () => {
    if (s3) return s3;
    console.log("🚀 Attempting to connect S3...");
    let accessKeyId = process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY,
        region = process.env.AWS_REGION;

    AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
    });

    s3 = new AWS.S3();
    console.log("✅ S3 Connected!");
    return s3;
};

const getS3Client = () => connectToS3();

module.exports = { connectToS3, getS3Client };