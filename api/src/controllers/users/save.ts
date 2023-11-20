import { Request, Response } from "express";
import { omit } from "lodash";

import { User } from "../../models/user-schema";

export const save = async (req: Request, res: Response) => {
  let returnedUser = {};
  
  try {
    returnedUser = await User.create({ ...req.body, ...req.params });
  } catch (e) {
    if (e instanceof Error) {
      return res.send(`Error on save: ${e.message}`);
    }

    return res.send("Error on save");
  }

  res.send(omit(returnedUser, ["__v", "_id"]));
};
