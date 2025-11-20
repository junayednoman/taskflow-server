"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const dashboard_service_1 = require("./dashboard.service");
const getDashboardStats = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await dashboard_service_1.DashboardService.getDashboardStats(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Dashboard stats retrieved successfully!",
        data: result,
    });
});
exports.DashboardController = { getDashboardStats };
//# sourceMappingURL=dashboard.controller.js.map