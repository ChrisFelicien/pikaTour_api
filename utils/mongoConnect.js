import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connection to DB successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
