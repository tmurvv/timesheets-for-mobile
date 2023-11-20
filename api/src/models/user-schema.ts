import { Schema, model } from "mongoose";

interface IUser {
  email: String;
  password: String;
  id: String;
  firstName: String;
  lastName: String;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash
  },
});

// userSchema.set('toObject', {
//   transform: function (doc, ret) {
//     delete ret._id
//     delete ret.__v
//   }
// })

export const User = model("user", userSchema);
