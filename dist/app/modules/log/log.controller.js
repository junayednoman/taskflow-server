"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const log_service_1 = require("./log.service");
const getLogs = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const options = req.query;
    const result = await log_service_1.LogService.getLogs(req.user.id, options);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Logs retrieved successfully!",
        data: result,
    });
});
const deleteLog = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const { logId } = req.params;
    const result = await log_service_1.LogService.deleteLog(logId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Log deleted successfully!",
        data: result,
    });
});
exports.LogController = { getLogs, deleteLog };
//# sourceMappingURL=log.controller.js.map