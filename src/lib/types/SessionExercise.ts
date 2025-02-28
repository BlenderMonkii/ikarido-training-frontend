import { Exercise } from "./Exercise";

export interface SessionExercise {
  sessionId: number;
  exerciseId: number;
  sets: number;
  pauseTime?: number;
  exercise: Exercise;
}
