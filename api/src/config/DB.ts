import mongoose from "mongoose";
const connectDB = async()=>{
    try {
      await mongoose.connect(process.env.MONGO_URL!);
      console.log("mongoose connected to the server ");
    } catch (error) {
      console.error("mongoDB connection failed:", error);
    }
}
export default connectDB