import { Request, Response } from "express";
import { Error } from "mongoose";
import { User, IUser } from "../../models/user-schema";
import jwt from "jsonwebtoken";
import "dotenv/config";


export const login = async (req: Request, res: Response) => {
  // fetch user and test password verification
  const found = await User.findOne({ email: req.body.email });

  if (found) {
    // test a matching password
    found.comparePasswords(req.body.password, function (err, isMatch) {
      if (err) {
        return res.send(
          "Error while attempting to compare passwords. Login unsuccessful."
        );
      }

      if (isMatch) {
        const token = jwt.sign(
          { id: 7, role: "captain" },
          "Why cant I get my secret from dot env"
        );

        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({ message: "Logged in successfully 😊 👌", status: "success", data: found.set(found) });

      } else {
        return res.send("The password does not match our records.");
      }
    });
  } else {
    res.send("Email not found.");
  }

  // function(err: Error, user: IUser) {
  //   if (err) throw err;

  // // test a failing password
  // user.comparePasswords('wrongpassword', function(err, isMatch) {
  //     if (err) throw err;
  //     console.log('wrognpassword', isMatch); // -> 123Password: false
  // });
  // }
};
