import ApiError from "../../classes/ApiError";
import config from "../../config";
import prisma from "../../utils/prisma";
import { TLogin, TSignUp } from "./auth.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (payload: TSignUp) => {
  const existing = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existing) throw new ApiError(409, "User already exists!");

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  const result = await prisma.user.create({ data: payload });
  return result;
};

const login = async (payload: TLogin) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  const isValid = await bcrypt.compare(payload.password, user.password);
  if (!isValid) throw new ApiError(400, "Invalid credentials!");

  const accessToken = jwt.sign(
    { id: user.id },
    config.jwt.accessSecret as string,
    {
      expiresIn: config.jwt.accessExpiration as any,
    }
  );

  return { accessToken };
};

export const AuthService = {
  signUp,
  login,
};
