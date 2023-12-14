import { Schema, model } from "mongoose";
import { USER_SCHEMA } from "../User";
import { TRAINEE_ENUMS } from "@/utils/enums";

const TRAINEE_SCHEMA = new Schema({
  ...USER_SCHEMA,
  activityLevel: {
    type: String,
    required: true,
    enum: {
      values: TRAINEE_ENUMS.activityLevel,
    },
  },
  primaryTarget: {
    type: String,
    required: true,
    enum: {
      values: TRAINEE_ENUMS.primaryTarget,
    },
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: "Coach",
  },
  workouts: {
    type: [Schema.Types.ObjectId],
    ref: "Workout",
  },
  challenges: {
    type: [Schema.Types.ObjectId],
    ref: "Challenge",
  },
});

export default model("Trainee", TRAINEE_SCHEMA);
