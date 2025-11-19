import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const signUp = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await AuthService.signUp(req.body);
  sendResponse(res, {
    message: "User created successfully!",
    data: result,
    status: 201,
  });
});

const login = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await AuthService.login(req.body);
  sendResponse(res, {
    message: "Login successfully!",
    data: result,
  });
});

export const AuthController = { signUp, login };
