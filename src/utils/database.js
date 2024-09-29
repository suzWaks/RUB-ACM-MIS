import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strict");

  console.log(process.env.MONGODB_URI);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "rub_acm_mis",
    });
    (isConnected = true), console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
