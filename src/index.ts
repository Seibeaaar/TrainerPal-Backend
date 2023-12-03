import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/db";

import authRouter from "./routes/auth";
import traineeUserRouter from "./routes/trainee/userActions";
import coachUserRouter from "./routes/coach/userActions";
import coachWorkoutRouter from "./routes/coach/workoutActions";
import traineeWorkoutRouter from "./routes/trainee/workoutActions";

const app = express();

dotenv.config();

app.use(helmet());
app.use(express.json());
app.use("/auth", authRouter);

app.use("/trainee/user", traineeUserRouter);
app.use("/trainee/workouts", traineeWorkoutRouter);

app.use("/coach/user", coachUserRouter);
app.use("/coach/workouts", coachWorkoutRouter);

connectToDatabase();

app.listen(5001);
