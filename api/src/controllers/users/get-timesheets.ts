import { Request, Response } from "express";

import { Timesheet } from "../../models/timesheet-schema";

export const getTimesheets = async (req: Request, res: Response) => {
  const data = await Timesheet.find({id: req.params.id});

  if (!data) {
    return res.status(404).json({ status: "fail", message: "no data found" });
  }

  res.status(200).json({ status: "success", data });
};
