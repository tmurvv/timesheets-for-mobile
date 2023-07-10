import { Router } from "express";

import { login, signup } from "../controllers/auth";

const router = Router();

router.post("v1/auth/login", login);
router.post("v1/auth/signup", signup);

export const authRouter = router;
