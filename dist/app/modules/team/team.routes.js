"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = require("express");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const team_controller_1 = require("./team.controller");
const team_validation_1 = require("./team.validation");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(team_validation_1.teamZod), team_controller_1.TeamController.createTeam);
router.get("/", (0, authorize_1.default)(), team_controller_1.TeamController.getTeams);
router.patch("/:teamId", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(team_validation_1.teamZod.partial()), team_controller_1.TeamController.updateTeam);
exports.teamRoutes = router;
//# sourceMappingURL=team.routes.js.map