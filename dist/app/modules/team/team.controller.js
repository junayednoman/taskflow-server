"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const sendResponse_1 = require("../../utils/sendResponse");
const team_service_1 = require("./team.service");
const createTeam = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await team_service_1.TeamServices.createTeam(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Team created successfully!",
        data: result,
        status: 201,
    });
});
const getTeams = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await team_service_1.TeamServices.getTeams(req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Teams retrieved successfully!",
        data: result,
    });
});
const updateTeam = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await team_service_1.TeamServices.updateTeam(req.user.id, req.params.teamId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Team updated successfully!",
        data: result,
    });
});
exports.TeamController = { createTeam, getTeams, updateTeam };
//# sourceMappingURL=team.controller.js.map