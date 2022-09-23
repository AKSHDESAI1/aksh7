import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUri = "mongodb://localhost:27017";
        const dbOptions = {
            dbName: "Assignment"
        };
        const connect = await mongoose.connect(mongoUri, dbOptions);
        console.log("Connection Successfully");
    } catch (error) {
        console.log("error", error)
    }
}

export default connectDb;