import { Request, Response } from "express";
import { Timesheet } from "../../models/timesheet-schema";

export const getAll = (req: Request, res: Response) => {
  const data = Timesheet.find({});
  if (!data) {
    return res.status(404).json({ status: "fail", message: "no data found" });
  }

  return res
    .status(200)
    .json({ status: "success", data });
};
