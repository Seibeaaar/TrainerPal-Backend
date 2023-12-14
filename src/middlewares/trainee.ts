import { Request, Response, NextFunction } from "express";
import Trainee from "@/models/User/Trainee";
import AuthProfile from "@/models/User/AuthProfile";

export const validateTraineeCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Trainee.validate(req.body);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

// Check one trainee for things like update, delete etc.
export const validateTraineeIsPresent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Trainee.findById(req.body.id);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const validateTraineeRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authProfile = await AuthProfile.findById(res.locals.id);
    if (authProfile?.role !== "trainee") {
      res.statusCode = 403;
      next("Request can only be made by a trainee");
    }
    const trainee = await Trainee.findById(authProfile?.roleDocRef);
    if (!trainee) {
      res.statusCode = 400;
      next("No trainee found");
    }
    res.locals = {
      ...res.locals,
      trainee,
    };
    next();
  } catch (e) {
    res.send(e);
  }
};

// Check when we have multiple trainees (e.g. workouts)
export const validateTraineesArePresent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ids = req.body.trainees;
    if (!ids) {
      res.statusCode = 400;
      next("No ids provided");
    }
    const traineesInDB = await Trainee.find({
      _id: {
        $in: ids,
      },
    });
    if (traineesInDB.length !== ids.length) {
      res.statusCode = 400;
      next("Not all trainees are present");
    }
    res.locals = {
      ...res.locals,
      trainees: traineesInDB,
    };
    next();
  } catch (e) {
    res.send(e);
  }
};
