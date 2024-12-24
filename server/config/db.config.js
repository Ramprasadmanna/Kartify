import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`.brightCyan.underline);
  } catch (error) {
    console.error(`MongoDB Connection Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;