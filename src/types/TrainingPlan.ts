import { Session } from "./Session";

export type TrainingPlan = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  goal: string;
  startDate: string;
  endDate: string;
  sessions: Session[];
};
