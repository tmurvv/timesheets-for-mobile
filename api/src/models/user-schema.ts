import { Schema, model } from "mongoose";

interface IUser {
  email: String;
  password: String;
  id: String;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
});

userSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  }
})


export const User = model("user", userSchema);
