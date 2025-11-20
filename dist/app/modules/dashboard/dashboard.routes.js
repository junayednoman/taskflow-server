"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = require("express");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
router.get("/", (0, authorize_1.default)(), dashboard_controller_1.DashboardController.getDashboardStats);
exports.dashboardRoutes = router;
//# sourceMappingURL=dashboard.routes.js.map