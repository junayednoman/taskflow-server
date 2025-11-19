import { Router } from "express";
import { AuthController } from "./auth.controller";
import handleZodValidation from "../../middlewares/handleZodValidation";
import { loginZod, signUpZod } from "./auth.validation";

const router = Router();

router.post("/signup", handleZodValidation(signUpZod), AuthController.signUp);
router.post("/login", handleZodValidation(loginZod), AuthController.login);

export const authRoutes = router;
