import { Router } from "express";
import AuthProfile from "@/models/AuthProfile";
import { generateJWToken } from "@/utils/auth";

import {
  validateAuthProfile,
  validateLoginData,
  validateLoginCredentials,
} from "@/middlewares/auth";

const authRouter = Router();

authRouter.post("/signUp", validateAuthProfile, async (req, res) => {
  try {
    const authProfile = new AuthProfile(req.body);
    await authProfile.save();
    const token = generateJWToken(authProfile.id);
    res.status(201).send({
      authProfile,
      token,
    });
  } catch (e) {
    res.status(500).send("Something wrong with a server");
  }
});

authRouter.post(
  "/login",
  validateLoginData,
  validateLoginCredentials,
  async (req, res) => {
    try {
      const { profile } = res.locals;
      const token = generateJWToken(profile.id);
      res.status(200).send({
        authProfile: profile,
        token,
      });
    } catch (e) {
      res.status(500).send("Something wrong with a server");
    }
  },
);

export default authRouter;
