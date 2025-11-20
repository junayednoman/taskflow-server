"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const express_1 = require("express");
const log_controller_1 = require("./log.controller");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const router = (0, express_1.Router)();
router.get("/", (0, authorize_1.default)(), log_controller_1.LogController.getLogs);
router.delete("/:logId", (0, authorize_1.default)(), log_controller_1.LogController.deleteLog);
exports.logRoutes = router;
//# sourceMappingURL=log.routes.js.map