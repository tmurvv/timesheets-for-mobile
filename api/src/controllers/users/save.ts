import { Request, Response } from "express";
import {omit} from "lodash";

import {User} from "/models"

export const save = async (req: Request, res: Response) => {
  const returnedUser = await User.create({...req.body, ...req.params});

  res.send(omit(returnedUser, ["__v","_id"]));
};
