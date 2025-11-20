import { Prisma } from "@prisma/client";
import ApiError from "../../classes/ApiError";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation";
import prisma from "../../utils/prisma";
import { TCreateMember } from "./member.validation";

const addMember = async (userId: string, payload: TCreateMember) => {
  const team = await prisma.team.findUniqueOrThrow({
    where: { id: payload.teamId },
    select: {
      userId: true,
    },
  });
  if (team.userId !== userId)
    throw new ApiError(403, "You are not authorized to add members!");

  const existing = await prisma.member.findFirst({
    where: { name: payload.name, teamId: payload.teamId, role: payload.role },
  });

  if (existing)
    throw new ApiError(
      409,
      "Member already exists in the team with the same name & role!"
    );

  const result = await prisma.member.create({ data: payload });
  return result;
};

const getMembers = async (
  query: Record<string, any>,
  options: TPaginationOptions,
  userId: string
) => {
  const whereConditions: Prisma.MemberWhereInput = {};

  if (query.team) {
    const team = await prisma.team.findUniqueOrThrow({
      where: { id: query.team },
      select: {
        userId: true,
      },
    });

    if (team.userId !== userId)
      throw new ApiError(
        403,
        "You are not authorized to view members of this team!"
      );
    whereConditions.teamId = query.team;
  } else {
    whereConditions.team = {
      userId,
    };
  }

  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);
  const members = await prisma.member.findMany({
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

  const total = await prisma.member.count({
    where: whereConditions,
  });

  const meta = { page, limit: take, total };
  return { meta, members };
};

const checkCapacity = async (memberId: string) => {
  const member = await prisma.member.findUniqueOrThrow({
    where: { id: memberId },
    select: { capacity: true, _count: { select: { tasks: true } } },
  });
  if (member.capacity <= member._count.tasks) {
    throw new ApiError(400, "Insufficient capacity!");
  }
};

const getLeastLoadedMember = async (projectId: string) => {
  console.log("projectId, ", projectId);
  const project = await prisma.project.findFirstOrThrow({
    where: { id: projectId },
    select: { teamId: true },
  });
  const teamId = project.teamId;
  const member = await prisma.member.findFirst({
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
  } else {
    throw new ApiError(404, "No members found!");
  }
};

export const MemberServices = {
  addMember,
  getMembers,
  checkCapacity,
  getLeastLoadedMember,
};
