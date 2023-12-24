import { Request, Response } from "express";

import { User } from "../../models/user-schema";

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ id });

  res.send(user);
};
