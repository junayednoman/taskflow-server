import { Router } from "express";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { TeamController } from "./team.controller";
import { teamZod } from "./team.validation";
import authorize from "../../middlewares/authorize";

const router = Router();

router.post(
  "/",
  authorize(),
  handleZodValidation(teamZod),
  TeamController.createTeam
);

router.get("/", authorize(), TeamController.getTeams);

router.patch(
  "/:teamId",
  authorize(),
  handleZodValidation(teamZod.partial()),
  TeamController.updateTeam
);

export const teamRoutes = router;
