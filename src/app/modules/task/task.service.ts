import prisma from "../../utils/prisma";
import ApiError from "../../classes/ApiError";
import { TCreateTask } from "./task.validation";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation";
import { Prisma } from "@prisma/client";

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

const getTasks = async (
  userId: string,
  options: TPaginationOptions,
  query: Record<string, any>
) => {
  const { project, member } = query;
  const andConditions: Prisma.TaskWhereInput[] = [];

  andConditions.push({ authorId: userId });

  if (project) {
    andConditions.push({ projectId: project });
  }
  if (member) {
    andConditions.push({ assignedMemberId: member });
  }

  const whereConditions: Prisma.TaskWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const tasks = await prisma.task.findMany({
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
  console.log("payload, ", payload);
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

const reAssignTask = async (userId: string) => {
  const members = await prisma.member.findMany({
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
    throw new ApiError(404, "No members found!");
  }

  const overloadedMembers = members.filter(m => m.tasks.length > m.capacity);

  const freeMembers = members.filter(m => m.tasks.length < m.capacity);

  if (overloadedMembers.length === 0) {
    throw new ApiError(404, "No overloaded members found!");
  }

  for (const member of overloadedMembers) {
    const totalOverload = member.tasks.length - member.capacity;

    const movableTasks = member.tasks.filter(t => t.priority !== "HIGH");

    if (movableTasks.length === 0) continue;

    const tasksToMove = movableTasks.slice(0, totalOverload);

    for (const task of tasksToMove) {
      const target = freeMembers.find(m => m.tasks.length < m.capacity);

      if (!target) break;

      await prisma.$transaction(async tn => {
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

export const TaskServices = {
  createTask,
  getTasks,
  editTask,
  deleteTask,
  reAssignTask,
};
