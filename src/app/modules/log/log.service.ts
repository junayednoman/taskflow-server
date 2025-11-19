import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation";
import prisma from "../../utils/prisma";

const getLogs = async (userId: string, options: TPaginationOptions) => {
  const { page, take, skip, sortBy, orderBy } = calculatePagination(options);

  const logs = await prisma.log.findMany({
    where: { userId },
    include: {
      task: true,
      fromMember: true,
      toMember: true,
    },
    skip,
    take,
    orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { dateTime: "desc" },
  });

  const total = await prisma.log.count({
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

const deleteLog = async (logId: string) => {
  const log = await prisma.log.delete({
    where: { id: logId },
  });
  return log;
};

export const LogService = { getLogs, deleteLog };
