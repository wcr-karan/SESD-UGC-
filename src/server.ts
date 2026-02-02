import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    let mongoUri = process.env.MONGO_URI;

    // Use In-Memory DB if specified or if we are in a verification mode
    if (process.env.USE_MEMORY_DB === 'true') {
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri();
        console.log("Started MongoDB Memory Server");
    }

    if (!mongoUri) {
        mongoUri = "mongodb://localhost:27017/product_inventory";
    }

    mongoose
        .connect(mongoUri)
        .then(() => {
            console.log(`Connected to MongoDB at ${mongoUri}`);
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Database connection error:", error);
            process.exit(1);
        });
}

startServer();
