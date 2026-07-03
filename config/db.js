import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {

  try {

    await mongoose.connect(env.mongodbUri, {

      serverSelectionTimeoutMS: 10000,

      socketTimeoutMS: 45000

    });

    mongoose.connection.on("connected", () => {

      console.log("Mongo Connected");

    });

  } catch (error) {
    mongoose.connection.on("error", err => {
      console.error(err);
    });

    mongoose.connection.on("disconnected", () => {

      console.log("Mongo Disconnected");

    });

    process.exit(1);
  }
}