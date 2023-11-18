import { Request, Response } from "express";

import { User } from "../../models/user-schema";

export const getAll = (req: Request, res: Response) => {
  res.send("IMIN")
  // res.send(User.find({}));
};
