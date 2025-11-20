"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.projectZod = zod_1.default.object({
    name: zod_1.default.string().min(2, "Project name must be at least 2 characters"),
    teamId: zod_1.default.string().uuid("Invalid Team ID"),
});
//# sourceMappingURL=project.validation.js.map