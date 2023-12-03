import { Schema, model } from "mongoose";
import { WORKOUT_ENUMS } from "@/utils/enums";

const WorkoutBodySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Coach",
  },
  rating: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
  accessMode: {
    type: String,
    enum: {
      values: WORKOUT_ENUMS.accessMode,
    },
  },
  exercises: {
    type: [
      {
        id: {
          ref: "Exercise",
          required: true,
          type: Schema.Types.ObjectId,
        },
        sets: {
          type: Number,
          required: true,
          min: 0,
        },
        // In case of exercises on time - number of seconds
        reps: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
});

export default model("WorkoutBody", WorkoutBodySchema);
