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

export const teamRoutes = router;
