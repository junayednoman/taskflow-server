import ApiError from "../../classes/ApiError";
import prisma from "../../utils/prisma";
import { TCreateTeam } from "./team.validation";

const createTeam = async (userId: string, payload: TCreateTeam) => {
  const existing = await prisma.team.findFirst({
    where: { name: payload.name, userId },
  });
  if (existing) throw new ApiError(409, "Team already exists with the name!");

  payload.userId = userId;

  const result = await prisma.team.create({ data: payload });
  return result;
};

const getTeams = async (userId: string) => {
  const teams = await prisma.team.findMany({
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
    const totalTasks = team.projects.reduce(
      (sum, project) => sum + project._count.tasks,
      0
    );

    const totalCapacity = team.members.reduce(
      (sum, member) => sum + member.capacity,
      0
    );

    return {
      ...team,
      totalTasks,
      totalCapacity,
    };
  });

  return teamsWithAggregates;
};

const updateTeam = async (
  userId: string,
  teamId: string,
  payload: Partial<TCreateTeam>
) => {
  const team = await prisma.team.findUniqueOrThrow({
    where: {
      id: teamId,
    },
  });

  if (team.userId !== userId) {
    throw new ApiError(403, "You do not have permission to update this team.");
  }

  const result = await prisma.team.update({
    where: { id: teamId },
    data: payload,
  });
  return result;
};

export const TeamServices = {
  createTeam,
  getTeams,
  updateTeam,
};
