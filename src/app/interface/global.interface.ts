import { Request } from "express";

export type TAuthUser = {
  id: string;
  email: string;
};

export type TRequest = Request & {
  user?: TAuthUser;
};
