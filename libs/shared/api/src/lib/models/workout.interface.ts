import { IUser } from './user.interface';
import { IEntity } from "./Entity.interface";
import { IExercise } from "./exercise.interface";

export enum WorkoutType {
    Cardio = 'Cardio',
    Bodywheight = 'Bodywheigt',
    WeightLifting = 'Weight Lifting',
    CrossFit = 'Cross Fit'
}

export interface IWorkoutIdentity extends IEntity {
    number: number;
    date: Date;
    favorite: boolean;
    user: IUser | null;
}

export interface IWorkoutInfo {
    name: string;
    description: string;
    duration: number;
    type: WorkoutType;
}

export interface IWorkout extends IWorkoutIdentity, IWorkoutInfo {
    exercises: IExercise[] | null;
}

export type ICreateWorkout = Pick<IWorkout, 'name' | 'description' | 'type'>;
export type IUpdateWorkout = Partial<Omit<IWorkout, 'id' | 'number'>>;
export type IUpsertWorkout = IWorkout;

