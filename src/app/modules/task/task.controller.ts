import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import pick from "../../utils/pick";
import { sendResponse } from "../../utils/sendResponse";
import { TaskServices } from "./task.service";

const createTask = handleAsyncRequest(async (req: TRequest, res) => {
  const task = await TaskServices.createTask(req.user!.id, req.body);
  sendResponse(res, {
    message: "Task created successfully!",
    data: task,
    status: 201,
  });
});

const getTasks = handleAsyncRequest(async (req: TRequest, res) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "orderBy"]);
  const tasks = await TaskServices.getTasks(req.user!.id, options);
  sendResponse(res, { message: "Tasks retrieved successfully!", data: tasks });
});

const editTask = handleAsyncRequest(async (req: TRequest, res) => {
  const task = await TaskServices.editTask(
    req.params.id as string,
    req.user!.id,
    req.body
  );
  sendResponse(res, { message: "Task updated successfully!", data: task });
});

const deleteTask = handleAsyncRequest(async (req: TRequest, res) => {
  const task = await TaskServices.deleteTask(
    req.params.id as string,
    req.user!.id
  );
  sendResponse(res, { message: "Task deleted successfully!", data: task });
});

const reAssignTask = handleAsyncRequest(async (req: TRequest, res) => {
  const task = await TaskServices.reAssignTask(req.user!.id);
  sendResponse(res, { message: "Task reassigned successfully!", data: task });
});

export const TaskController = {
  createTask,
  getTasks,
  editTask,
  deleteTask,
  reAssignTask,
};
