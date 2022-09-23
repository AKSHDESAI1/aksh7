import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUri = "mongodb+srv://aksh2137:aksh2137@cluster0.jpqpxva.mongodb.net/";
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