import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
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
  const result = await TeamServices.getTeams(req.user!.id);
  sendResponse(res, {
    message: "Teams retrieved successfully!",
    data: result,
  });
});

const updateTeam = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await TeamServices.updateTeam(
    req.user!.id,
    req.params.teamId as string,
    req.body
  );
  sendResponse(res, {
    message: "Team updated successfully!",
    data: result,
  });
});

export const TeamController = { createTeam, getTeams, updateTeam };
