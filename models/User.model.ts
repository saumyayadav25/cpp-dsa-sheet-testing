import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  full_name?: string;
  email: string;
  password?: string;
  avatar?: string | null;
  provider?: "credentials" | "google" | "github";
  isVerified?: boolean;
  otp?: string;
  otpExpiry?: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  subscribedToEmails?: boolean;
  subscribedToNewsletter?: boolean;
}

const UserSchema = new Schema<IUser>({
  full_name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  avatar: { type: String, default: null },
  provider: { type: String, default: "credentials" },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date,
  // New field to track email subscription , newletters
  subscribedToEmails: { type: Boolean, default: true },
  subscribedToNewsletter: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const User = models.User || model<IUser>("User", UserSchema);
