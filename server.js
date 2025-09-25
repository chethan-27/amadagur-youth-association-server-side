const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { connectToS3 } = require("./src/config/connectToS3") || {};
const server = async () => {
    dotenv.config();
    await connectDB();
    await connectToS3();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

server();
