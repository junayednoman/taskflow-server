import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import pick from "../../utils/pick";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await ProjectServices.createProject(req.user!.id, req.body);
  sendResponse(res, {
    message: "Project created successfully!",
    data: result,
    status: 201,
  });
});

const getProjects = handleAsyncRequest(async (req: TRequest, res) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "orderBy"]);
  const result = await ProjectServices.getProjects(req.user!.id, options);
  sendResponse(res, {
    message: "Projects retrieved successfully!",
    data: result,
  });
});

const updateProject = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await ProjectServices.updateProject(
    req.user!.id,
    req.params.projectId as string,
    req.body
  );
  sendResponse(res, {
    message: "Project updated successfully!",
    data: result,
  });
});

export const ProjectController = { createProject, getProjects, updateProject };
