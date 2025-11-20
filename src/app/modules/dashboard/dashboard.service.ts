import prisma from "../../utils/prisma";

const getDashboardStats = async (userId: string) => {
  const teams = await prisma.team.count({ where: { userId } });
  const members = await prisma.member.count({
    where: { team: { userId } },
  });
  const projects = await prisma.project.count({ where: { userId } });
  const tasks = await prisma.task.count({ where: { authorId: userId } });

  return { teams, members, projects, tasks };
};

export const DashboardService = { getDashboardStats };
