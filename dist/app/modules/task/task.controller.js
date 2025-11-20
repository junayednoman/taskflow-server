"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const task_service_1 = require("./task.service");
const createTask = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const task = await task_service_1.TaskServices.createTask(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Task created successfully!",
        data: task,
        status: 201,
    });
});
const getTasks = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "orderBy"]);
    const tasks = await task_service_1.TaskServices.getTasks(req.user.id, options, req.query);
    (0, sendResponse_1.sendResponse)(res, { message: "Tasks retrieved successfully!", data: tasks });
});
const editTask = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const task = await task_service_1.TaskServices.editTask(req.params.id, req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, { message: "Task updated successfully!", data: task });
});
const deleteTask = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const task = await task_service_1.TaskServices.deleteTask(req.params.id, req.user.id);
    (0, sendResponse_1.sendResponse)(res, { message: "Task deleted successfully!", data: task });
});
const reAssignTask = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const task = await task_service_1.TaskServices.reAssignTask(req.user.id);
    (0, sendResponse_1.sendResponse)(res, { message: "Task reassigned successfully!", data: task });
});
exports.TaskController = {
    createTask,
    getTasks,
    editTask,
    deleteTask,
    reAssignTask,
};
//# sourceMappingURL=task.controller.js.map