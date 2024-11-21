import { IExercise } from "./exercise.interface";
import { IUser } from './user.interface';
import { Id } from "./id.type";

export enum WorkoutType {
    Cardio = 'Cardio',
    Bodywheight = 'Bodywheigt',
    WeightLifting = 'Weight Lifting',
    CrossFit = 'Cross Fit'
}

export interface IWorkoutIdentity {
    _id: Id;
    number: number;
    name: string;
    description: string;
    duration: number;
    date: Date;
    type: WorkoutType;
    user: IUser;
}

export interface IWorkout extends IWorkoutIdentity {
    exercises: IExercise[];
}

export type ICreateWorkout = Pick<IWorkout, 'name'>;
export type IUpdateWorkout = Partial<Omit<IWorkout, 'id'>>;
export type IUpsertWorkout = IWorkout;

