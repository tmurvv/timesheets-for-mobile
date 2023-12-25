import { Request, Response } from "express";

import { CustomError } from "Interfaces/custom-error";

type ErrorHandler = (err: CustomError, req: Request, res: Response) => void;

export const requestErrorHandler: ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response
) => {
  console.log("From requestErrorHandler", err);
  return res.json(err);
};
