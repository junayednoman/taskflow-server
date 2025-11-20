"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const team_routes_1 = require("../modules/team/team.routes");
const member_routes_1 = require("../modules/member/member.routes");
const project_routes_1 = require("../modules/project/project.routes");
const task_routes_1 = require("../modules/task/task.routes");
const dashboard_routes_1 = require("../modules/dashboard/dashboard.routes");
const log_routes_1 = require("../modules/log/log.routes");
const router = (0, express_1.Router)();
const routes = [
    { path: "/auths", route: auth_routes_1.authRoutes },
    { path: "/teams", route: team_routes_1.teamRoutes },
    { path: "/members", route: member_routes_1.memberRoutes },
    { path: "/projects", route: project_routes_1.projectRoutes },
    { path: "/tasks", route: task_routes_1.taskRoutes },
    { path: "/dashboard", route: dashboard_routes_1.dashboardRoutes },
    { path: "/logs", route: log_routes_1.logRoutes },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map