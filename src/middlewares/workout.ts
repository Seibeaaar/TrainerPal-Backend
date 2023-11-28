import { Request, Response, NextFunction } from "express";
import ScheduledWorkout from "@/models/Workout/ScheduledWorkout";
import WorkoutBody from "@/models/Workout/WorkoutBody";
import AuthProfile from "@/models/User/AuthProfile";
import Coach from "@/models/User/Coach";

export const validateCoachRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authProfile = await AuthProfile.findById(res.locals.id);
    if (authProfile?.role !== "coach") {
      res.statusCode = 403;
      next("Not allowed to create or update a workout");
    }
    const coach = await Coach.findById(authProfile!.roleDocRef);
    if (!coach) {
      res.statusCode = 400;
      next(`No coach with id found`);
    }
    res.locals = {
      ...res.locals,
      coach,
    };
    next();
  } catch (e) {
    res.send(e);
  }
};

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
