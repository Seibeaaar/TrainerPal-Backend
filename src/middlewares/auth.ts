import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthProfile from "@/models/AuthProfile";
import { LOGIN_SCHEMA } from "@/utils/auth";

export const validateAuthProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await AuthProfile.validate(req.body);
    next();
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const validateJWToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.statusCode = 401;
      return next("No authentication header provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next("No token provided");
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
      if (err) {
        res.statusCode = 403;
        return next("Invalid token");
      }
      next();
    });
  } catch (e) {
    res.send(e);
  }
};

export const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await LOGIN_SCHEMA.validate(req.body);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const validateLoginCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await AuthProfile.findOne({
      email: req.body.email,
    });
    if (!profile) {
      res.statusCode = 400;
      return next("No user with such credentials");
    }
    if (req.body.password) {
      bcrypt.compare(req.body.password, profile.password, (err) => {
        if (err) return next("No user");
      });
    }
    res.locals = profile;
    next();
  } catch (e) {
    res.send(e);
  }
};
