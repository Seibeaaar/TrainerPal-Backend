import { WorkoutAccessMode } from "./enums";

export interface WorkoutBodyType {
  _id: string;
  author: string;
  rating: number;
  votes: number;
  accessMode: WorkoutAccessMode;
  exercises: string[];
}
