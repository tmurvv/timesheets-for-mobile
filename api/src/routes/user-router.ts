import { Router } from "express";

import { userControllers } from "../controllers/users/";

const router = Router();

router.put("/v1/users/:id", userControllers.save);
router.get("/v1/users/:email", userControllers.getOne);
router.delete("/v1/users/:id", userControllers.del);
router.get("/v1/users", userControllers.getAll);
router.get("/v1/users/get-timesheets/:id", userControllers.getTimesheets);

export const userRouter = router;
