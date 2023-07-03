import { RouteObject } from "../Interfaces";

import { userControllers } from "../controllers/users";

import { createRouter } from "./create-router";

const router = createRouter("timeSheets", <RouteObject>userControllers);

export const userRouter = router;
