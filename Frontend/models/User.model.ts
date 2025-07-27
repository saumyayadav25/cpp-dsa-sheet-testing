import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  full_name?: string;
  email: string;
  password?: string;
  avatar?: string;
  provider?: "credentials" | "google" | "github";
  isVerified?: boolean;
  otp?: string;
  otpExpiry?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const UserSchema = new Schema<IUser>({
  full_name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  avatar: String,
  provider: { type: String, default: "credentials" },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date,
}, {
  timestamps: true
});

export const User = models.User || model<IUser>("User", UserSchema);
