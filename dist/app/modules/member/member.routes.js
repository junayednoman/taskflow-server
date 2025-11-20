"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = require("express");
const authorize_1 = __importDefault(require("../../middlewares/authorize"));
const member_controller_1 = require("./member.controller");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const member_validation_1 = require("./member.validation");
const router = (0, express_1.Router)();
router.post("/", (0, authorize_1.default)(), (0, handleZodValidation_1.default)(member_validation_1.createMemberZod), member_controller_1.MemberController.addMember);
router.get("/", (0, authorize_1.default)(), member_controller_1.MemberController.getMembers);
router.post("/:memberId/capacity", (0, authorize_1.default)(), member_controller_1.MemberController.checkCapacity);
router.post("/:projectId/least-loaded", (0, authorize_1.default)(), member_controller_1.MemberController.getLeastLoadedMember);
exports.memberRoutes = router;
//# sourceMappingURL=member.routes.js.map