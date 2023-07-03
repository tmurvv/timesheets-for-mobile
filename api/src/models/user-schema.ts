import { Schema, model } from "mongoose";

interface IUser {
  userId: String;
  password: String;
  id: String;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
});

export const User = model("user", userSchema);
