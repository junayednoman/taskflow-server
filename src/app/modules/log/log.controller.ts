import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { LogService } from "./log.service";

const getLogs = handleAsyncRequest(async (req: TRequest, res) => {
  const options = req.query;
  const result = await LogService.getLogs(req.user!.id, options);
  sendResponse(res, {
    message: "Logs retrieved successfully!",
    data: result,
  });
});

const deleteLog = handleAsyncRequest(async (req: TRequest, res) => {
  const { logId } = req.params;
  const result = await LogService.deleteLog(logId as string);
  sendResponse(res, {
    message: "Log deleted successfully!",
    data: result,
  });
});

export const LogController = { getLogs, deleteLog };
