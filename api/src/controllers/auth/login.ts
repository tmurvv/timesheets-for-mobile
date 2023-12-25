import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { requestErrorHandler } from "../../error-handling/request-error-handler";
import { User } from "../../models/user-schema";

export const login = async (req: Request, res: Response) => {
  const found = await User.findOne({ email: req.body.email });
  if (!found)
    return requestErrorHandler(
      { statusCode: 404, message: "Email not found." },
      req,
      res
    );

  found.comparePasswords(req.body.password, function (err, isMatch) {
    if (isMatch) {
      const token = jwt.sign(
        { id: found.id, role: "user" },
        "Why cant I get my secret from dot env"
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ status: "success", data: found.set(found) });
    } else {
      requestErrorHandler(
        { statusCode: 404, message: "Password does not match our records." },
        req,
        res
      );
    }
  });
};
