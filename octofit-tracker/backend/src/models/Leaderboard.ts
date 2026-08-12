import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  totalActivities: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
