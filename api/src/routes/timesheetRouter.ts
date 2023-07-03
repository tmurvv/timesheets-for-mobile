import { Router } from "express";

import {
  deleteTimesheet,
  getAllTimesheets,
  getOneTimesheet,
  saveTimesheet,
} from "../controllers/time-sheets";

const router = Router();

router.delete("/timesheets/:id", deleteTimesheet);
router.get("/timesheets", getAllTimesheets);
router.get("/timesheets/:id", getOneTimesheet);
router.post("/timesheets/:id", saveTimesheet);

export const timesheetRouter = router;
