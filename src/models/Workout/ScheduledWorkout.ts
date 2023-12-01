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
  trainee: {
    type: Schema.Types.ObjectId,
    ref: "Trainee",
    required: true,
  },
  site: {
    type: String,
    required: true,
    enum: {
      values: WORKOUT_ENUMS.site,
    },
  },
  status: {
    type: String,
    enum: {
      values: WORKOUT_ENUMS.scheduleStatus,
    },
  },
});

export default model("ScheduledWorkout", ScheduledWorkoutSchema);
