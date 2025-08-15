import { Schema, model, models, Document, Types } from "mongoose";

export interface IBadgeItem {
  name: string;
  claimedAt: Date;
}

export interface IBadge extends Document {
  userId: Types.ObjectId;
  badges: IBadgeItem[]; // Array of badges with timestamps
}

const BadgeSchema = new Schema<IBadge>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    badges: [
      {
        name: { type: String, required: true },
        claimedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Badge = models.Badge || model<IBadge>("Badge", BadgeSchema);
