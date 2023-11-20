import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: String;
  password: string | Buffer;
  id: String;
  firstName: String;
  lastName: String;
  comparePasswords(
    candidatePassword: string,
    next: (err: Error | null, same: boolean | null) => void
  ): void;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
});

// userSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt)
  
//   next();
// });

// Hash the password
userSchema.pre('save', async function (this: IUser, next: (err?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt();

  bcrypt.hash(this.password, salt, (err: Error | undefined, hash: string) => {
    if (err) return next(err);
    this.password = hash;
  });
});

userSchema.methods.comparePasswords = function (
  candidatePassword: string,
  next: (err: Error | null, same: boolean | null) => void,
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return next(err, null);
    }
    next(null, isMatch);
  });
};


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
