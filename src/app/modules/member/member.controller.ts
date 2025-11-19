import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import pick from "../../utils/pick";
import { sendResponse } from "../../utils/sendResponse";
import { MemberServices } from "./member.service";

const addMember = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await MemberServices.addMember(req.user!.id, req.body);
  sendResponse(res, {
    message: "Member added successfully!",
    data: result,
    status: 201,
  });
});

const getMembers = handleAsyncRequest(async (req: TRequest, res) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "orderBy"]);
  const result = await MemberServices.getMembers(
    req.query,
    options,
    req.user!.id
  );
  sendResponse(res, {
    message: "Members retrieved successfully!",
    data: result,
  });
});

export const MemberController = { addMember, getMembers };
