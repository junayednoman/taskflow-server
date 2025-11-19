import { Router } from "express";
import authorize from "../../middlewares/authorize";
import { MemberController } from "./member.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { createMemberZod } from "./member.validation";

const router = Router();

router.post(
  "/",
  authorize(),
  handleZodValidation(createMemberZod),
  MemberController.addMember
);

router.get("/", authorize(), MemberController.getMembers);

export const memberRoutes = router;
