"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ApiError_1 = __importDefault(require("../../classes/ApiError"));
const config_1 = __importDefault(require("../../config"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = async (payload) => {
    const existing = await prisma_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (existing)
        throw new ApiError_1.default(409, "User already exists!");
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    payload.password = hashedPassword;
    const result = await prisma_1.default.user.create({ data: payload });
    return result;
};
const login = async (payload) => {
    const user = await prisma_1.default.user.findUniqueOrThrow({
        where: { email: payload.email },
    });
    const isValid = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isValid)
        throw new ApiError_1.default(400, "Invalid credentials!");
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.jwt.accessSecret, {
        expiresIn: config_1.default.jwt.accessExpiration,
    });
    return { accessToken };
};
exports.AuthService = {
    signUp,
    login,
};
//# sourceMappingURL=auth.service.js.map