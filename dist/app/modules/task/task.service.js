"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const ApiError_1 = __importDefault(require("../../classes/ApiError"));
const paginationCalculation_1 = require("../../utils/paginationCalculation");
const createTask = async (authorId, payload) => {
    await prisma_1.default.project.findUniqueOrThrow({ where: { id: payload.projectId } });
    await prisma_1.default.member.findUniqueOrThrow({
        where: { id: payload.assignedMemberId },
    });
    const task = await prisma_1.default.task.create({
        data: {
            ...payload,
            authorId,
        },
    });
    return task;
};
const getTasks = async (userId, options, query) => {
    const { project, member } = query;
    const andConditions = [];
    andConditions.push({ authorId: userId });
    if (project) {
        andConditions.push({ projectId: project });
    }
    if (member) {
        andConditions.push({ assignedMemberId: member });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const { page, take, skip, sortBy, orderBy } = (0, paginationCalculation_1.calculatePagination)(options);
    const tasks = await prisma_1.default.task.findMany({
        where: whereConditions,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            createdAt: true,
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
            assignedMember: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        skip,
        take,
        orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { createdAt: "desc" },
    });
    const total = await prisma_1.default.task.count({ where: { authorId: userId } });
    const meta = {
        page,
        limit: take,
        total,
    };
    return { meta, tasks };
};
const editTask = async (taskId, userId, payload) => {
    console.log("payload, ", payload);
    if (payload.projectId) {
        await prisma_1.default.project.findUniqueOrThrow({
            where: { id: payload.projectId },
        });
    }
    if (payload.assignedMemberId) {
        await prisma_1.default.member.findUniqueOrThrow({
            where: { id: payload.assignedMemberId },
        });
    }
    const task = await prisma_1.default.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.authorId !== userId)
        throw new ApiError_1.default(403, "Not authorized");
    return await prisma_1.default.task.update({
        where: { id: taskId },
        data: payload,
    });
};
const deleteTask = async (taskId, userId) => {
    const task = await prisma_1.default.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.authorId !== userId)
        throw new ApiError_1.default(403, "Not authorized");
    return await prisma_1.default.task.delete({ where: { id: taskId } });
};
const reAssignTask = async (userId) => {
    const members = await prisma_1.default.member.findMany({
        where: {
            team: {
                userId,
            },
        },
        include: {
            tasks: true,
        },
        orderBy: {
            tasks: {
                _count: "desc",
            },
        },
    });
    if (members.length === 0) {
        throw new ApiError_1.default(404, "No members found!");
    }
    const overloadedMembers = members.filter(m => m.tasks.length > m.capacity);
    const freeMembers = members.filter(m => m.tasks.length < m.capacity);
    if (overloadedMembers.length === 0) {
        throw new ApiError_1.default(404, "No overloaded members found!");
    }
    for (const member of overloadedMembers) {
        const totalOverload = member.tasks.length - member.capacity;
        const movableTasks = member.tasks.filter(t => t.priority !== "HIGH");
        if (movableTasks.length === 0)
            continue;
        const tasksToMove = movableTasks.slice(0, totalOverload);
        for (const task of tasksToMove) {
            const target = freeMembers.find(m => m.tasks.length < m.capacity);
            if (!target)
                break;
            await prisma_1.default.$transaction(async (tn) => {
                await tn.task.update({
                    where: { id: task.id },
                    data: { assignedMemberId: target.id },
                });
                await tn.log.create({
                    data: {
                        userId,
                        taskId: task.id,
                        fromMemberId: member.id,
                        toMemberId: target.id,
                        action: "REASSIGN",
                        description: `Task "${task.title}" moved from ${member.name} → ${target.name}`,
                    },
                });
            });
            member.tasks = member.tasks.filter(t => t.id !== task.id);
            target.tasks.push(task);
        }
    }
};
exports.TaskServices = {
    createTask,
    getTasks,
    editTask,
    deleteTask,
    reAssignTask,
};
//# sourceMappingURL=task.service.js.map