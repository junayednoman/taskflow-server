"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getDashboardStats = async (userId) => {
    const teams = await prisma_1.default.team.count({ where: { userId } });
    const members = await prisma_1.default.member.count({
        where: { team: { userId } },
    });
    const projects = await prisma_1.default.project.count({ where: { userId } });
    const tasks = await prisma_1.default.task.count({ where: { authorId: userId } });
    return { teams, members, projects, tasks };
};
exports.DashboardService = { getDashboardStats };
//# sourceMappingURL=dashboard.service.js.map