import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { teamRoutes } from "../modules/team/team.routes";

const router = Router();

const routes = [
  { path: "/auths", route: authRoutes },
  { path: "/teams", route: teamRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
