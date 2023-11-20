import mongoose from "mongoose";

export const createDatabaseUrl = () => {
  const { MONGODB_PASSWORD, MONGODB_USER } = process.env;
  return `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@main.um1bmro.mongodb.net/?retryWrites=true&w=majority`;
};

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(createDatabaseUrl());
  } catch (e) {
    console.log(e);
  }
};
