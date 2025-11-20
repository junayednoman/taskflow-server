"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const signUp = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.signUp(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User created successfully!",
        data: result,
        status: 201,
    });
});
const login = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Login successfully!",
        data: result,
    });
});
exports.AuthController = { signUp, login };
//# sourceMappingURL=auth.controller.js.map