import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getDashboardStats = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await DashboardService.getDashboardStats(req.body);
  sendResponse(res, {
    message: "Dashboard stats retrieved successfully!",
    data: result,
  });
});

export const DashboardController = { getDashboardStats };
