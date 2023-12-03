import { Router } from "express";

import { validateScheduledWorkoutIsPresent } from "@/middlewares/workouts/scheduled";
import { validateTraineeRole } from "@/middlewares/trainee";
import { validateJWToken } from "@/middlewares/auth";
import { DEFAULT_SERVER_ERROR } from "@/utils/constants";
import { ScheduleStatus } from "@/types/enums";

const traineeWorkoutRouter = Router();

traineeWorkoutRouter.put(
  "/accept",
  validateJWToken,
  validateTraineeRole,
  validateScheduledWorkoutIsPresent,
  async (req, res) => {
    try {
      const { trainee, scheduledWorkout } = res.locals;
      const scheduledWorkoutDoc = await scheduledWorkout.updateOne({
        status: ScheduleStatus.accepted,
      });
      const traineeDoc = await trainee.updateOne({
        $addToSet: {
          workouts: {
            id: scheduledWorkout.id,
            completed: false,
          },
        },
      });
      res.status(200).send({
        trainee: traineeDoc,
        scheduledWorkout: scheduledWorkoutDoc,
      });
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

traineeWorkoutRouter.put(
  "/decline",
  validateJWToken,
  validateTraineeRole,
  validateScheduledWorkoutIsPresent,
  async (req, res) => {
    try {
      const { trainee, scheduledWorkout } = res.locals;
      const traineeDoc = await trainee.updateOne({
        $pull: {
          workouts: {
            id: scheduledWorkout.id,
          },
        },
      });
      const scheduledWorkoutDoc = await scheduledWorkout.updateOne({
        status: ScheduleStatus.declined,
      });
      res.status(200).send({
        trainee: traineeDoc,
        scheduledWorkout: scheduledWorkoutDoc,
      });
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

export default traineeWorkoutRouter;
