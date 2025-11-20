"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = require("express");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const project_validation_1 = require("./project.validation");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(project_validation_1.projectZod), project_controller_1.ProjectController.createProject);
router.get("/", (0, authorize_1.default)(), project_controller_1.ProjectController.getProjects);
router.patch("/:projectId", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(project_validation_1.projectZod.partial()), project_controller_1.ProjectController.updateProject);
exports.projectRoutes = router;
//# sourceMappingURL=project.routes.js.map