import { Router } from "express";
import { validateJWToken } from "@/middlewares/auth";
import AuthProfile from "@/models/AuthProfile";
import Coach from "@/models/Coach";
import { validateCoachCreate } from "@/middlewares/coach";
import { DEFAULT_SERVER_ERROR } from "@/utils/constants";

const coachRouter = Router();

coachRouter.post(
  "/create",
  validateJWToken,
  validateCoachCreate,
  async (req, res) => {
    try {
      const coach = new Coach(req.body);
      await coach.save();
      const authProfile = await AuthProfile.findByIdAndUpdate(
        res.locals.id,
        {
          role: "coach",
          roleDocRef: coach.id,
        },
        {
          new: true,
        },
      );
      res.status(200).send({
        fitnesProfile: coach,
        authProfile,
      });
    } catch (e) {
      res.status(500).send(DEFAULT_SERVER_ERROR);
    }
  },
);

export default coachRouter;
