import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { User } from "../../models/user-schema";

export const login = async (req: Request, res: Response) => {
  const found = await User.findOne({ email: req.body.email });

  if (found) {
    found.comparePasswords(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(400).json({
          status: "Bad request",
          message: "Password does not match our records.",
        });
      }

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
        return res.send("The password does not match our records.");
      }
    });
  } else {
    return res.status(400).json({
      status: "Bad request",
      message: "Email not found.",
    });
  }
};
