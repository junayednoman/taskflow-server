"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectServices = void 0;
const ApiError_1 = __importDefault(require("../../classes/ApiError"));
const paginationCalculation_1 = require("../../utils/paginationCalculation");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createProject = async (userId, payload) => {
    await prisma_1.default.team.findUniqueOrThrow({
        where: { id: payload.teamId },
    });
    const existing = await prisma_1.default.project.findFirst({
        where: { name: payload.name, teamId: payload.teamId },
    });
    if (existing)
        throw new ApiError_1.default(409, "Project already exists in this team with the name!");
    payload.userId = userId;
    const result = await prisma_1.default.project.create({ data: payload });
    return result;
};
const getProjects = async (userId, options) => {
    const { page, take, skip, sortBy, orderBy } = (0, paginationCalculation_1.calculatePagination)(options);
    const projects = await prisma_1.default.project.findMany({
        where: { userId },
        select: {
            id: true,
            name: true,
            team: { select: { id: true, name: true } },
            tasks: { select: { id: true } },
            createdAt: true,
        },
        skip,
        take,
        orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { createdAt: "desc" },
    });
    const total = await prisma_1.default.project.count({ where: { userId } });
    const meta = { page, limit: take, total };
    return { meta, projects };
};
const updateProject = async (userId, projectId, payload) => {
    const project = await prisma_1.default.project.findUniqueOrThrow({
        where: { id: projectId },
    });
    if (project.userId !== userId)
        throw new ApiError_1.default(403, "Not authorized");
    const result = await prisma_1.default.project.update({
        where: { id: projectId },
        data: payload,
    });
    return result;
};
exports.ProjectServices = {
    createProject,
    getProjects,
    updateProject,
};
//# sourceMappingURL=project.service.js.map