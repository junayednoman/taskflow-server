"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const ApiError_1 = __importDefault(require("../../classes/ApiError"));
const paginationCalculation_1 = require("../../utils/paginationCalculation");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const addMember = async (userId, payload) => {
    const team = await prisma_1.default.team.findUniqueOrThrow({
        where: { id: payload.teamId },
        select: {
            userId: true,
        },
    });
    if (team.userId !== userId)
        throw new ApiError_1.default(403, "You are not authorized to add members!");
    const existing = await prisma_1.default.member.findFirst({
        where: { name: payload.name, teamId: payload.teamId, role: payload.role },
    });
    if (existing)
        throw new ApiError_1.default(409, "Member already exists in the team with the same name & role!");
    const result = await prisma_1.default.member.create({ data: payload });
    return result;
};
const getMembers = async (query, options, userId) => {
    const whereConditions = {};
    if (query.team) {
        const team = await prisma_1.default.team.findUniqueOrThrow({
            where: { id: query.team },
            select: {
                userId: true,
            },
        });
        if (team.userId !== userId)
            throw new ApiError_1.default(403, "You are not authorized to view members of this team!");
        whereConditions.teamId = query.team;
    }
    else {
        whereConditions.team = {
            userId,
        };
    }
    const { page, take, skip, sortBy, orderBy } = (0, paginationCalculation_1.calculatePagination)(options);
    const members = await prisma_1.default.member.findMany({
        where: {
            teamId: query.team,
        },
        select: {
            id: true,
            name: true,
            role: true,
            capacity: true,
            _count: {
                select: {
                    tasks: true,
                },
            },
        },
        skip,
        take,
        orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { createdAt: "desc" },
    });
    const total = await prisma_1.default.member.count({
        where: whereConditions,
    });
    const meta = { page, limit: take, total };
    return { meta, members };
};
const checkCapacity = async (memberId) => {
    const member = await prisma_1.default.member.findUniqueOrThrow({
        where: { id: memberId },
        select: { capacity: true, _count: { select: { tasks: true } } },
    });
    if (member.capacity <= member._count.tasks) {
        throw new ApiError_1.default(400, "Insufficient capacity!");
    }
};
const getLeastLoadedMember = async (projectId) => {
    console.log("projectId, ", projectId);
    const project = await prisma_1.default.project.findFirstOrThrow({
        where: { id: projectId },
        select: { teamId: true },
    });
    const teamId = project.teamId;
    const member = await prisma_1.default.member.findFirst({
        where: {
            teamId,
        },
        orderBy: {
            tasks: {
                _count: "asc",
            },
        },
        select: {
            id: true,
            name: true,
        },
    });
    if (member) {
        return { member };
    }
    else {
        throw new ApiError_1.default(404, "No members found!");
    }
};
exports.MemberServices = {
    addMember,
    getMembers,
    checkCapacity,
    getLeastLoadedMember,
};
//# sourceMappingURL=member.service.js.map