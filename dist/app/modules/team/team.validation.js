"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.teamZod = zod_1.default.object({
    name: zod_1.default.string().min(2, "Name must be at least 2 characters"),
});
//# sourceMappingURL=team.validation.js.map