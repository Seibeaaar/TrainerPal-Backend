import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/db";

import authRouter from "./routes/auth";
import traineeRouter from "./routes/trainee";

const app = express();

dotenv.config();

app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/trainee", traineeRouter);

connectToDatabase();

app.listen(5001, () => console.log("Sho to tam"));
