import { Router } from "express";
import {
  validateWorkoutBody,
  validateIfWorkoutAuthor,
  validateWorkoutIsPresent,
} from "@/middlewares/workouts/body";

import {
  validateScheduleWorkout,
  validateScheduledWorkoutIsPresent,
} from "@/middlewares/workouts/scheduled";
import { validateTraineeIsPresent } from "@/middlewares/trainee";
import { validateJWToken } from "@/middlewares/auth";
import { validateCoachRole } from "@/middlewares/coach";
import { DEFAULT_SERVER_ERROR } from "@/utils/constants";

import WorkoutBody from "@/models/Workout/WorkoutBody";
import ScheduledWorkout from "@/models/Workout/ScheduledWorkout";
import Trainee from "@/models/User/Trainee";
import { WORKOUT_ENUMS, toggleValue } from "@/utils/enums";
import { ScheduleStatus } from "@/types/enums";
import { WorkoutAccessMode } from "@/types/enums";

const coachWorkoutRouter = Router();

coachWorkoutRouter.post(
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
        accessMode: WorkoutAccessMode.private,
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

coachWorkoutRouter.put(
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

coachWorkoutRouter.delete(
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

coachWorkoutRouter.post(
  "/schedule",
  validateJWToken,
  validateCoachRole,
  validateWorkoutIsPresent,
  validateScheduleWorkout,
  validateTraineeIsPresent,
  async (req, res) => {
    try {
      const { coach } = res.locals;
      const scheduledWorkout = new ScheduledWorkout({
        ...req.body,
        coach: coach.id,
        status: ScheduleStatus.pending,
      });
      await scheduledWorkout.save();
      await coach.updateOne({
        $addToSet: {
          scheduledWorkouts: {
            id: scheduledWorkout.id,
            completed: false,
          },
        },
      });
      res.status(200).send(scheduledWorkout);
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

coachWorkoutRouter.post(
  "/cancel",
  validateJWToken,
  validateCoachRole,
  validateScheduledWorkoutIsPresent,
  async (req, res) => {
    try {
      const { coach, scheduledWorkout } = res.locals;
      await Trainee.findByIdAndUpdate(scheduledWorkout.trainee, {
        $pull: {
          workouts: scheduledWorkout.id,
        },
      });
      const coachDoc = await coach.updateOne({
        $pull: {
          scheduledWorkouts: {
            id: scheduledWorkout.id,
          },
        },
      });
      await scheduledWorkout.deleteOne();
      res.status(200).send(coachDoc);
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

export default coachWorkoutRouter;
