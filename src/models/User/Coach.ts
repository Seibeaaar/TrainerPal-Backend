import { Schema, model } from "mongoose";
import { USER_SCHEMA } from "./utils";
import { COACH_ENUMS } from "@/utils/enums";

const COACH_SCHEMA = new Schema({
  ...USER_SCHEMA,
  field: {
    type: String,
    enum: {
      values: COACH_ENUMS.field,
    },
    required: true,
  },
  trainees: {
    type: [Schema.Types.ObjectId],
    ref: "Trainee",
  },
  authoredWorkouts: {
    type: [Schema.Types.ObjectId],
    ref: "WorkoutBody",
  },
});

export default model("Coach", COACH_SCHEMA);
