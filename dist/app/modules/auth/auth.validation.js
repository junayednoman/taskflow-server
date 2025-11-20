"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginZod = exports.signUpZod = void 0;
const zod_1 = require("zod");
exports.signUpZod = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128)
        .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
        .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
        .regex(/(?=.*\d)/, "Password must contain a number"),
});
exports.loginZod = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
});
//# sourceMappingURL=auth.validation.js.map