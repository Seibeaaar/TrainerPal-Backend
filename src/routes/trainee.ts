import { Router } from "express";
import { validateJWToken } from "@/middlewares/auth";
import Trainee from "@/models/Trainee";
import AuthProfile from "@/models/AuthProfile";

import { validateTraineeCreate } from "@/middlewares/trainee";

const router = Router();

router.post(
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
        trainee,
      });
    } catch (e) {
      res.status(500).send("Something wrong with a server");
    }
  },
);

export default router;
