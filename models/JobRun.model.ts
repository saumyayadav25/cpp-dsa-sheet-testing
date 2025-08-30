import { Schema, model, models, Document } from "mongoose";

export interface IJobRun extends Document {
  jobName: string;
  dateKey: string;
}

const JobRunSchema = new Schema<IJobRun>({
  jobName: { type: String, required: true },
  dateKey: { type: String, required: true },
}, {
  timestamps: true
});

JobRunSchema.index({ jobName: 1, dateKey: 1 }, { unique: true });

export const JobRun = models.JobRun || model<IJobRun>("JobRun", JobRunSchema);
