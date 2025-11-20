"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.taskZod = zod_1.default.object({
    projectId: zod_1.default.string().uuid("Invalid project ID"),
    assignedMemberId: zod_1.default.string().uuid("Invalid member ID"),
    title: zod_1.default.string().min(2, "Title must be at least 2 characters"),
    description: zod_1.default.string().min(5, "Description must be at least 5 characters"),
    priority: zod_1.default.enum(["LOW", "MEDIUM", "HIGH"]),
    status: zod_1.default.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});
//# sourceMappingURL=task.validation.js.map