import { Request, Response } from "express";
import {save} from "../users/save";

export const signup = async (req: Request, res: Response) => {
  await save(req, res);
};
