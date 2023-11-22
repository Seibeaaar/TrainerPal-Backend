import { Router } from "express";
import { validateJWToken } from "@/middlewares/auth";
import AuthProfile from "@/models/User/AuthProfile";
import Coach from "@/models/User/Coach";
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

coachRouter.delete("/delete", validateJWToken, async (req, res) => {
  try {
    const authProfile = await AuthProfile.findById(res.locals.id);
    const coach = await Coach.findById(authProfile?.roleDocRef);
    await authProfile?.deleteOne();
    await coach?.deleteOne();
    res.status(200).send({});
  } catch (e) {
    res.status(500).send(DEFAULT_SERVER_ERROR);
  }
});

export default coachRouter;
