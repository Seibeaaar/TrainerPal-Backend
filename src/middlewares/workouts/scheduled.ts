import { Request, Response, NextFunction } from "express";
import ScheduledWorkout from "@/models/Workout/ScheduledWorkout";

export const validateScheduleWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ScheduledWorkout.validate(req.body);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const validateScheduledWorkoutIsPresent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scheduledWorkout = await ScheduledWorkout.findById(req.body.workout);
    if (!scheduledWorkout) {
      next("No scheduled workout found with id");
    }
    res.locals = {
      ...res.locals,
      scheduledWorkout,
    };
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};
