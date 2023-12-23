import { Request, Response } from "express";

import { User } from "../../models";

export const getAll = async (req: Request, res: Response) => {
  const data = await User.find({});

  if (!data) {
    return res.status(404).json({ status: "fail", message: "no data found" });
  }

  res.status(200).json({ status: "success", data });
};
