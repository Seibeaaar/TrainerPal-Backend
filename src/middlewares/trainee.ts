import { Request, Response, NextFunction } from "express";
import Trainee from "@/models/User/Trainee";

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
