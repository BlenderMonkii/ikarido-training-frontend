import { SessionExercise } from "./SessionExercise";

export type Session = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  sessionDate: Date | null;
  duration: number;
  isPublic: boolean;
  type: string;
  sessionExercises: SessionExercise[];
};
