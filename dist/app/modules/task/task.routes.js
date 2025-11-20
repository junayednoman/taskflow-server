"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const task_controller_1 = require("./task.controller");
const task_validation_1 = require("./task.validation");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(task_validation_1.taskZod), task_controller_1.TaskController.createTask);
router.get("/", (0, authorize_1.default)(), task_controller_1.TaskController.getTasks);
router.patch("/reassign", (0, authorize_1.default)(), task_controller_1.TaskController.reAssignTask);
router.patch("/:id", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(task_validation_1.taskZod.partial()), task_controller_1.TaskController.editTask);
router.delete("/:id", (0, authorize_1.default)(), task_controller_1.TaskController.deleteTask);
exports.taskRoutes = router;
//# sourceMappingURL=task.routes.js.map