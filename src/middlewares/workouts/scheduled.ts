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
