import { Request, Response, NextFunction } from "express";
import Coach from "@/models/User/Coach";

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
