import { RouteObject} from "../Interfaces";
import { timeSheetControllers } from "../controllers/time-sheets";

import { createRouter } from "./create-router";

const router = createRouter("timeSheets", <RouteObject>timeSheetControllers);

export const timesheetRouter = router;
