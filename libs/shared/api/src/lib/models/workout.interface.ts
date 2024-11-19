import { IExersize } from "./exersize.interface";
import { Id } from "./id.type";

export enum WorkoutType {
    Cardio = 'Cardio',
    Bodywheight = 'Bodywheigt',
    WeightLifting = 'Weight Lifting',
    CrossFit = 'Cross Fit'
}

export interface IWorkoutIdentity {
    _id: string;
    name: string;
    duration: number;
    date: Date;
    type: WorkoutType;
}

export interface IWorkout extends IWorkoutIdentity {
    exersizes: IExersize;
}

export type ICreateWorkout = Pick<IWorkout, 'name'>;
export type IUpdateWorkout = Partial<Omit<IWorkout, 'id'>>;
export type IUpsertWorkout = IWorkout;

