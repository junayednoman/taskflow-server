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
  if (!query.team) throw new ApiError(400, "Team id is required!");
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
    where: {
      teamId: query.team,
    },
  });

  const meta = { page, limit: take, total };
  return { meta, members };
};

export const MemberServices = { addMember, getMembers };
