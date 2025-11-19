import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/", authorize(), DashboardController.getDashboardStats);

export const dashboardRoutes = router;
