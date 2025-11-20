"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const handleZodValidation_1 = __importDefault(require("../../middlewares/handleZodValidation"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, handleZodValidation_1.default)(auth_validation_1.signUpZod), auth_controller_1.AuthController.signUp);
router.post("/login", (0, handleZodValidation_1.default)(auth_validation_1.loginZod), auth_controller_1.AuthController.login);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map