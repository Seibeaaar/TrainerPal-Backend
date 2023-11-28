import { Schema, model } from "mongoose";
import dayjs from "dayjs";
import { WORKOUT_ENUMS } from "@/utils/enums";

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
    required: true,
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
  ],
  site: {
    type: String,
    required: true,
    enum: {
      values: WORKOUT_ENUMS.site,
    },
  },
});

export default model("ScheduledWorkout", ScheduledWorkoutSchema);
