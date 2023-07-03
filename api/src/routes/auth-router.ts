import { Router } from "express";

import { login, signup } from "../controllers/auth";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/signup", signup);

export const authRouter = router;
