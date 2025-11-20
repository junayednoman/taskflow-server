import ApiError from "../../classes/ApiError";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation";
import prisma from "../../utils/prisma";
import { TCreateProject } from "./project.validation";

const createProject = async (userId: string, payload: TCreateProject) => {
  await prisma.team.findUniqueOrThrow({
    where: { id: payload.teamId },
  });

  const existing = await prisma.project.findFirst({
    where: { name: payload.name, teamId: payload.teamId },
  });
  if (existing)
    throw new ApiError(
      409,
      "Project already exists in this team with the name!"
    );

  payload.userId = userId;

  const result = await prisma.project.create({ data: payload });
  return result;
};

const getProjects = async (userId: string, options: TPaginationOptions) => {
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const projects = await prisma.project.findMany({
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

  const total = await prisma.project.count({ where: { userId } });
  const meta = { page, limit: take, total };

  return { meta, projects };
};

const updateProject = async (
  userId: string,
  projectId: string,
  payload: Partial<TCreateProject>
) => {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
  });

  if (project.userId !== userId) throw new ApiError(403, "Not authorized");

  const result = await prisma.project.update({
    where: { id: projectId },
    data: payload,
  });
  return result;
};

export const ProjectServices = {
  createProject,
  getProjects,
  updateProject,
};
