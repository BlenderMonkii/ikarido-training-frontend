import { Timer } from "./Timer";

export type Exercise = {
  readonly id?: number;
  ownerId: number;
  name: string;
  description?: string;
  duration?: number;
  isPublic: boolean;
  location?: string;
  repetitions?: number;
  exerciseType: string;
  timer: Timer;
};

export type FingerboardExercise = Exercise & {
  boardName: string;
  edgeSize: number;
  gripType: string;
  fingers: string;
};

export type BoardExercise = Exercise & {
  board: string;
  angle: number;
  Boulder: Boulder[];
};

export type Boulder = {
  name: string;
  grade: string;
};

export type CampusExercise = Exercise & {
  rungs: number;
  distance: number;
  gripType: string;
};

export type StrengthExercise = Exercise & {
  weight: number;
  muscleGroup: string;
};
