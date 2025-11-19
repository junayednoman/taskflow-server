import prisma from "../../utils/prisma";

const getDashboardStats = async (userId: string) => {
  const totalTeams = await prisma.team.count({ where: { userId } });
  const totalMembers = await prisma.member.count({
    where: { team: { userId } },
  });
  const totalProjects = await prisma.project.count({ where: { userId } });
  const totalTasks = await prisma.task.count({ where: { authorId: userId } });

  return { totalTeams, totalMembers, totalProjects, totalTasks };
};

export const DashboardService = { getDashboardStats };
