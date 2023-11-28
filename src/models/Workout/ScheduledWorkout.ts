import { Schema, model } from "mongoose";
import dayjs from "dayjs";
import { WORKOUT_ENUMS } from "@/utils/enums";

const ScheduledWorkoutSchema = new Schema({
  date: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        const isValid = dayjs(v).isValid();
        if (!isValid) return false;
        return dayjs() < dayjs(v);
      },
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
    required: true,
  },
  trainees: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trainee",
        required: true,
      },
    ],
    required: true,
    validate: (v: string[]) => Array.isArray(v) && v.length > 0,
  },
  site: {
    type: String,
    required: true,
    enum: {
      values: WORKOUT_ENUMS.site,
    },
  },
});

export default model("ScheduledWorkout", ScheduledWorkoutSchema);
