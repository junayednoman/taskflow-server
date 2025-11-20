"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamServices = void 0;
const ApiError_1 = __importDefault(require("../../classes/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createTeam = async (userId, payload) => {
    const existing = await prisma_1.default.team.findFirst({
        where: { name: payload.name, userId },
    });
    if (existing)
        throw new ApiError_1.default(409, "Team already exists with the name!");
    payload.userId = userId;
    const result = await prisma_1.default.team.create({ data: payload });
    return result;
};
const getTeams = async (userId) => {
    const teams = await prisma_1.default.team.findMany({
        where: { userId },
        select: {
            id: true,
            name: true,
            createdAt: true,
            _count: {
                select: {
                    members: true,
                    projects: true,
                },
            },
            members: {
                select: {
                    capacity: true, // fetch capacity for aggregation
                },
            },
            projects: {
                select: {
                    _count: {
                        select: {
                            tasks: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    const teamsWithAggregates = teams.map(team => {
        const totalTasks = team.projects.reduce((sum, project) => sum + project._count.tasks, 0);
        const totalCapacity = team.members.reduce((sum, member) => sum + member.capacity, 0);
        return {
            ...team,
            totalTasks,
            totalCapacity,
        };
    });
    return teamsWithAggregates;
};
const updateTeam = async (userId, teamId, payload) => {
    const team = await prisma_1.default.team.findUniqueOrThrow({
        where: {
            id: teamId,
        },
    });
    if (team.userId !== userId) {
        throw new ApiError_1.default(403, "You do not have permission to update this team.");
    }
    const result = await prisma_1.default.team.update({
        where: { id: teamId },
        data: payload,
    });
    return result;
};
exports.TeamServices = {
    createTeam,
    getTeams,
    updateTeam,
};
//# sourceMappingURL=team.service.js.map