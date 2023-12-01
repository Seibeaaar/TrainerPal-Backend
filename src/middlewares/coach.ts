import { Request, Response, NextFunction } from "express";
import Coach from "@/models/User/Coach";
import AuthProfile from "@/models/User/AuthProfile";

export const validateCoachCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Coach.validate(req.body);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

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
