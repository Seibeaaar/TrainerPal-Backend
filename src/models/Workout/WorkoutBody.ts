import { Schema, model } from "mongoose";
import { WORKOUT_ENUMS } from "@/utils/enums";

const WorkoutBodySchema = new Schema({
  site: {
    type: String,
    required: true,
    enum: {
      values: WORKOUT_ENUMS.site,
    },
  },
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
});

export default model("WorkoutBody", WorkoutBodySchema);
