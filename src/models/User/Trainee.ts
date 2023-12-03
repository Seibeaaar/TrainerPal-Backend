import { Schema, model } from "mongoose";
import { USER_SCHEMA } from "./utils";
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
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "ScheduledWorkout",
        },
        completed: {
          type: Boolean,
        },
        _id: false,
      },
    ],
  },
  challenges: {
    type: [Schema.Types.ObjectId],
    ref: "Challenge",
  },
});

export default model("Trainee", TRAINEE_SCHEMA);
