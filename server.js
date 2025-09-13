const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

const server = async () => {
    dotenv.config();
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

server();
