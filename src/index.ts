import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/db";

import authRouter from "./routes/auth";

const app = express();

dotenv.config();

app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);

connectToDatabase();

app.listen(5001, () => console.log("Sho to tam"));
