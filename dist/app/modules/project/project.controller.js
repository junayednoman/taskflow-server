"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const project_service_1 = require("./project.service");
const createProject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await project_service_1.ProjectServices.createProject(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Project created successfully!",
        data: result,
        status: 201,
    });
});
const getProjects = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "orderBy"]);
    const result = await project_service_1.ProjectServices.getProjects(req.user.id, options);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Projects retrieved successfully!",
        data: result,
    });
});
const updateProject = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await project_service_1.ProjectServices.updateProject(req.user.id, req.params.projectId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Project updated successfully!",
        data: result,
    });
});
exports.ProjectController = { createProject, getProjects, updateProject };
//# sourceMappingURL=project.controller.js.map