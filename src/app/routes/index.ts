import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const routes = [{ path: "/auths", route: authRoutes }];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
