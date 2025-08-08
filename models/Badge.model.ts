import { Schema, model, models, Document, Types } from "mongoose";

export interface IBadge extends Document {
  userId:  Types.ObjectId;
  badges: string[]; // e.g. ["Consistency_7", "Hard_Hitter"]
}

const BadgeSchema = new Schema<IBadge>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    badges: [{ type: String }]
  },
  { timestamps: true }
);

export const Badge = models.Badge || model<IBadge>("Badge", BadgeSchema);
