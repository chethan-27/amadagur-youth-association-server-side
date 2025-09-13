const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("🚀 Attempting to connect DB...");
        let env = process.env;
        let userid = env.MONGO_USERID;
        let password = env.MONGO_PASSWORD;
        let dbname = env.MONGO_DBNAME;
        let url = `mongodb+srv://${userid}:${password}@${dbname}.pmthy4g.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0`
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting DB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
