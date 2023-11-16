// getting-started.js
import mongoose from "mongoose";

// const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "auth_db";
// const dbUser = process.env.DB_USER;
// const dbUserPassword = process.env.DB_PASSWORD;

const mongoUrl = `mongodb://auth-mongo:${dbPort}/${dbName}`;

console.log(mongoUrl);

async function connectDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://dev040320:SpCThGd9YsCJX7TB@authenticated.15bhymr.mongodb.net/?retryWrites=true&w=majority"
        );

        console.log("connect db success");
    } catch (error) {
        console.log("connect db error", error);
    }
}

export default connectDB;
