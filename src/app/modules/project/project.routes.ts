import { Router } from "express";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { projectZod } from "./project.validation";
import authorize from "../../middlewares/authorize";
import { ProjectController } from "./project.controller";

const router = Router();

router.post(
  "/",
  authorize(),
  handleZodValidation(projectZod),
  ProjectController.createProject
);

router.get("/", authorize(), ProjectController.getProjects);

export const projectRoutes = router;
