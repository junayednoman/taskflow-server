import prisma from "../../utils/prisma";
import ApiError from "../../classes/ApiError";
import { TCreateTask } from "./task.validation";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation";

const createTask = async (authorId: string, payload: TCreateTask) => {
  await prisma.project.findUniqueOrThrow({ where: { id: payload.projectId } });
  await prisma.member.findUniqueOrThrow({
    where: { id: payload.assignedMemberId },
  });
  const task = await prisma.task.create({
    data: {
      ...payload,
      authorId,
    },
  });
  return task;
};

const getTasks = async (userId: string, options: TPaginationOptions) => {
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const tasks = await prisma.task.findMany({
    where: { authorId: userId },
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

  const total = await prisma.task.count({ where: { authorId: userId } });

  const meta = {
    page,
    limit: take,
    total,
  };

  return { meta, tasks };
};

const editTask = async (
  taskId: string,
  userId: string,
  payload: Partial<TCreateTask>
) => {
  if (payload.projectId) {
    await prisma.project.findUniqueOrThrow({
      where: { id: payload.projectId },
    });
  }
  if (payload.assignedMemberId) {
    await prisma.member.findUniqueOrThrow({
      where: { id: payload.assignedMemberId },
    });
  }

  const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });

  if (task.authorId !== userId) throw new ApiError(403, "Not authorized");

  return await prisma.task.update({
    where: { id: taskId },
    data: payload,
  });
};

const deleteTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });

  if (task.authorId !== userId) throw new ApiError(403, "Not authorized");

  return await prisma.task.delete({ where: { id: taskId } });
};

export const TaskServices = {
  createTask,
  getTasks,
  editTask,
  deleteTask,
};
