import { Schema, model } from "mongoose";
import { USER_SCHEMA } from "../User";

const TRAINEE_SCHEMA = new Schema({
  ...USER_SCHEMA,
});

export default model("Trainee", TRAINEE_SCHEMA);
