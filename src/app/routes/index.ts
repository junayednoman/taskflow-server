import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { teamRoutes } from "../modules/team/team.routes";
import { memberRoutes } from "../modules/member/member.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { taskRoutes } from "../modules/task/task.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { logRoutes } from "../modules/log/log.routes";

const router = Router();

const routes = [
  { path: "/auths", route: authRoutes },
  { path: "/teams", route: teamRoutes },
  { path: "/members", route: memberRoutes },
  { path: "/projects", route: projectRoutes },
  { path: "/tasks", route: taskRoutes },
  { path: "/dashboard", route: dashboardRoutes },
  { path: "/logs", route: logRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
