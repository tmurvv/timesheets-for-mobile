import { Request, Response } from "express";
import { omit } from "lodash";

import { User } from "../../models/user-schema";

export const save = async (req: Request, res: Response) => {
  let returnedUser: object | null = {};

  try {
    returnedUser = await User.findOneAndUpdate(
      { id: req.body.id },
      { ...req.body, ...req.params },
      { new: true, upsert: true }
    );
  } catch (e) {
    if (e instanceof Error) {
      return res.send(`Error on save: ${e.message}`);
    }

    return res.send("Error on save");
  }

  res
    .status(200)
    .json({ status: 200, data: omit(returnedUser, ["__v", "_id"]) });
};
