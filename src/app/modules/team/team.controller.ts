import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import pick from "../../utils/pick";
import { sendResponse } from "../../utils/sendResponse";
import { TeamServices } from "./team.service";

const createTeam = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await TeamServices.createTeam(req.user!.id, req.body);
  sendResponse(res, {
    message: "Team created successfully!",
    data: result,
    status: 201,
  });
});

const getTeams = handleAsyncRequest(async (req: TRequest, res) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "orderBy"]);
  const result = await TeamServices.getTeams(req.user!.id, options);
  sendResponse(res, {
    message: "Teams retrieved successfully!",
    data: result,
  });
});

export const TeamController = { createTeam, getTeams };
