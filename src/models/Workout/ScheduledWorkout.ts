import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const ScheduledWorkoutSchema = new Schema({
  date: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => dayjs(v).isValid(),
      message: "Invalid workout date",
    },
  },
  coach: {
    type: Schema.Types.ObjectId,
    ref: "Coach",
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workout",
  },
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trainee",
    },
  ],
});

export default model("ScheduledWorkout", ScheduledWorkoutSchema);
