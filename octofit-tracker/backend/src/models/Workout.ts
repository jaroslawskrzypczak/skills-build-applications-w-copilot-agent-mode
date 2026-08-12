import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Array<{
    name: string;
    reps?: number;
    sets?: number;
    duration?: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        reps: { type: Number },
        sets: { type: Number },
        duration: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
