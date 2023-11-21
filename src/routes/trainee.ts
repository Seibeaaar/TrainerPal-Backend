import { Router } from "express";
import { validateJWToken } from "@/middlewares/auth";
import Trainee from "@/models/Trainee";
import AuthProfile from "@/models/AuthProfile";

import { validateTraineeCreate } from "@/middlewares/trainee";
import { DEFAULT_SERVER_ERROR } from "@/utils/constants";

const traineeRouter = Router();

traineeRouter.post(
  "/create",
  validateJWToken,
  validateTraineeCreate,
  async (req, res) => {
    try {
      const trainee = new Trainee(req.body);
      await trainee.save();
      const authProfile = await AuthProfile.findByIdAndUpdate(
        res.locals.id,
        {
          role: "trainee",
          roleDocRef: trainee.id,
        },
        {
          new: true,
        },
      );
      res.status(200).send({
        authProfile,
        fitnessProfile: trainee,
      });
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

traineeRouter.delete("/delete", validateJWToken, async (req, res) => {
  try {
    const authProfile = await AuthProfile.findById(res.locals.id);
    const trainee = await Trainee.findById(authProfile?.roleDocRef);
    await authProfile?.deleteOne();
    await trainee?.deleteOne();
    res.status(200).send({});
  } catch (e) {
    res.status(500).send(DEFAULT_SERVER_ERROR);
  }
});

export default traineeRouter;
