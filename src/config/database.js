import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "FinWhats"
        });
        console.log("Conectado ao mongoDB!");
    } catch (error) {
        console.error("Falha na conexsão", error.message);
        process.exit(1);
    } 
};

export default connectDB;