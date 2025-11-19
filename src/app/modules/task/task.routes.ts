import { Router } from "express";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { TaskController } from "./task.controller";
import { taskZod } from "./task.validation";
import authorize from "../../middlewares/authorize";

const router = Router();

router.post(
  "/",
  authorize(),
  handleZodValidation(taskZod),
  TaskController.createTask
);
router.get("/", authorize(), TaskController.getTasks);
router.patch(
  "/:id",
  authorize(),
  handleZodValidation(taskZod.partial()),
  TaskController.editTask
);
router.delete("/:id", authorize(), TaskController.deleteTask);

export const taskRoutes = router;
