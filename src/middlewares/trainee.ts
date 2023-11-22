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
