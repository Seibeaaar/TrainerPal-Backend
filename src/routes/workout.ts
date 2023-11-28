import { Router } from "express";
import {
  validateWorkoutBody,
  validateCoachRole,
  validateIfWorkoutAuthor,
  validateWorkoutIsPresent,
  validateScheduleWorkout,
} from "@/middlewares/workout";
import { validateTraineesArePresent } from "@/middlewares/trainee";
import { validateJWToken } from "@/middlewares/auth";
import { DEFAULT_SERVER_ERROR } from "@/utils/constants";

import WorkoutBody from "@/models/Workout/WorkoutBody";
import ScheduledWorkout from "@/models/Workout/ScheduledWorkout";
import { WORKOUT_ENUMS, toggleValue } from "@/utils/enums";

const workoutRouter = Router();

workoutRouter.post(
  "/create",
  validateJWToken,
  validateCoachRole,
  validateWorkoutBody,
  async (req, res) => {
    try {
      const { coach } = res.locals;
      const workoutBody = new WorkoutBody({
        ...req.body,
        author: coach.id,
      });
      await workoutBody.save();
      await coach.updateOne({
        $addToSet: { authoredWorkouts: workoutBody.id },
      });
      res.status(200).send(workoutBody);
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

workoutRouter.put(
  "/updateAccess",
  validateJWToken,
  validateCoachRole,
  validateWorkoutIsPresent,
  validateIfWorkoutAuthor,
  async (req, res) => {
    try {
      const { workout } = res.locals;
      workout.accessMode = toggleValue(
        workout.accessMode,
        WORKOUT_ENUMS.accessMode,
      );
      await workout.save();
      res.status(200).send(workout);
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

workoutRouter.delete(
  "/delete",
  validateJWToken,
  validateCoachRole,
  validateWorkoutIsPresent,
  validateIfWorkoutAuthor,
  async (req, res) => {
    try {
      const { coach, workout } = res.locals;
      await workout.deleteOne();
      await coach.updateOne({
        $pull: { authoredWorkouts: workout.id },
      });
      res.status(200).send({});
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

workoutRouter.post(
  "/schedule",
  validateJWToken,
  validateCoachRole,
  validateWorkoutIsPresent,
  validateIfWorkoutAuthor,
  validateScheduleWorkout,
  validateTraineesArePresent,
  async (req, res) => {
    try {
      const { coach, trainees } = res.locals;
      const scheduledWorkout = new ScheduledWorkout({
        ...req.body,
        coach: coach.id,
      });
      await scheduledWorkout.save();
      await coach.updateOne({
        $addToSet: { scheduledWorkouts: scheduledWorkout.id },
      });
      for (const trainee of trainees) {
        await trainee.updateOne({
          $addToSet: { workouts: scheduledWorkout.id },
        });
      }
      res.status(200).send(scheduledWorkout);
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

export default workoutRouter;
