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
    const { email } = req.body;
    const token = generateJWToken(email);
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
      const token = generateJWToken(req.body.email);
      res.status(200).send({
        authProfile: res.locals,
        token,
      });
    } catch (e) {
      res.status(500).send("Something wrong with a server");
    }
  },
);

export default authRouter;
