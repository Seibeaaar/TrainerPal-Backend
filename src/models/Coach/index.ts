import { Schema, model } from "mongoose";
import { USER_SCHEMA } from "../User";

const COACH_SCHEMA = new Schema({
  ...USER_SCHEMA,
});

export default model("Coach", COACH_SCHEMA);
