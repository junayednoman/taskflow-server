"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const paginationCalculation_1 = require("../../utils/paginationCalculation");
const prisma_1 = __importDefault(require("../../utils/prisma"));
// Time
// Task
// From
// To
const getLogs = async (userId, options) => {
    const { page, take, skip, sortBy, orderBy } = (0, paginationCalculation_1.calculatePagination)(options);
    const logs = await prisma_1.default.log.findMany({
        where: { userId },
        select: {
            id: true,
            task: {
                select: {
                    title: true,
                },
            },
            fromMember: {
                select: {
                    name: true,
                },
            },
            toMember: {
                select: {
                    name: true,
                },
            },
            dateTime: true,
        },
        skip,
        take,
        orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { dateTime: "desc" },
    });
    const total = await prisma_1.default.log.count({
        where: { userId },
    });
    return {
        meta: {
            page,
            limit: take,
            total,
        },
        logs,
    };
};
const deleteLog = async (logId) => {
    const log = await prisma_1.default.log.delete({
        where: { id: logId },
    });
    return log;
};
exports.LogService = { getLogs, deleteLog };
//# sourceMappingURL=log.service.js.map