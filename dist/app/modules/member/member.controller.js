"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/handleAsyncRequest"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = require("../../utils/sendResponse");
const member_service_1 = require("./member.service");
const addMember = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await member_service_1.MemberServices.addMember(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Member added successfully!",
        data: result,
        status: 201,
    });
});
const getMembers = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "orderBy"]);
    const result = await member_service_1.MemberServices.getMembers(req.query, options, req.user.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Members retrieved successfully!",
        data: result,
    });
});
const checkCapacity = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await member_service_1.MemberServices.checkCapacity(req.params.memberId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Capable to get assigned!",
        data: result,
    });
});
const getLeastLoadedMember = (0, handleAsyncRequest_1.default)(async (req, res) => {
    const result = await member_service_1.MemberServices.getLeastLoadedMember(req.params.projectId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Member automatically assigned successfully!",
        data: result,
    });
});
exports.MemberController = {
    addMember,
    getMembers,
    checkCapacity,
    getLeastLoadedMember,
};
//# sourceMappingURL=member.controller.js.map