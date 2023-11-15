import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(helmet());

app.listen(5000, () => console.log("Listening"));
