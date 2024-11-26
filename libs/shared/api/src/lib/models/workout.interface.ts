import { ISet } from "./set.interface";
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
    favorite: boolean;
    type: WorkoutType;
    user: IUser;
}

export interface IWorkout extends IWorkoutIdentity {
    sets: ISet[];
}

export type ICreateWorkout = Pick<IWorkout, 'name' | 'description' | 'type'>;
export type IUpdateWorkout = Partial<Omit<IWorkout, 'id' | 'number'>>;
export type IUpsertWorkout = IWorkout;

