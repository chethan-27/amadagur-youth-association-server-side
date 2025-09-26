const { getS3Client } = require("../config/connectToS3");

const Bucket = "aya-files";
const uploadFile = async (req, res) => {
    try {

        let s3 = getS3Client();
        let region = process.env.AWS_REGION;

        const file = req.file;
        const title = req.body.title || file.originalname;

        const key = `uploads/${Date.now()}-${file.originalname}`;

        await s3
            .putObject({
                Bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
            .promise();

        res.json({
            title,
            url: `https://${Bucket}.s3.${region}.amazonaws.com/${key}`,
            type: file.mimetype,
            size: file.size,
            key,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "File upload failed" });
    }
}

const deleteFile = async (req, res) => {
    try {
        let s3 = getS3Client();
        let key = req.body.key;

        if (!key) {
            return res.status(400).json({ error: "File key is required" });
        }

        await s3
            .deleteObject({
                Bucket,
                Key: key,
            })
            .promise();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "File deletion failed" });
    }
};

module.exports = { uploadFile, deleteFile };