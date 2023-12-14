import { Request, Response, NextFunction } from "express";
import WorkoutBody from "@/models/Workout/WorkoutBody";

export const validateWorkoutIsPresent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const workout = await WorkoutBody.findById(req.body.workout);
    if (!workout) {
      res.statusCode = 400;
      next("No workout with id found");
    }
    res.locals = {
      ...res.locals,
      workout,
    };
    next();
  } catch (e) {
    res.send(e);
  }
};

export const validateIfWorkoutAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { coach } = res.locals;
    const workoutId = req.body.workout;
    if (!coach.authoredWorkouts.includes(workoutId)) {
      res.statusCode = 403;
      next("You are not allowed to change this workout");
    }
    next();
  } catch (e) {
    res.send(e);
  }
};

export const validateWorkoutBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await WorkoutBody.validate(req.body);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};
