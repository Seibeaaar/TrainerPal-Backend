import { Schema, model } from "mongoose";
import { WORKOUT_ENUMS } from "@/utils/enums";
import { WorkoutExerciseType } from "@/types/workouts";

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
    required: true,
    enum: {
      values: WORKOUT_ENUMS.accessMode,
    },
  },
  exercises: {
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
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
    required: true,
    validate: (v: WorkoutExerciseType[]) => Array.isArray(v) && v.length > 0,
  },
});

export default model("WorkoutBody", WorkoutBodySchema);
