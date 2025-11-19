import { Router } from "express";
import { LogController } from "./log.controller";
import authorize from "../../middlewares/authorize";

const router = Router();

router.get("/", authorize(), LogController.getLogs);

router.delete("/:logId", authorize(), LogController.deleteLog);

export const logRoutes = router;
