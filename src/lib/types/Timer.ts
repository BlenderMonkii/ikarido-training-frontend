export type Timer = {
  readonly id?: number;
  name: string;
  duration?: number;
  activeTime: number;
  restTime: number;
  pauseTime: number;
};
