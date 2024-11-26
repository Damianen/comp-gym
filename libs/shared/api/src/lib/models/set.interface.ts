import { IExercise } from "./exercise.interface";
import { Id } from "./id.type";

export enum SetType {
    Drop = 'Drop',
    Super = 'Super',
    WarmUp = 'WarmUp',
    Normal = 'Normal'
}

export interface ISet {
    _id: Id;
    exercise: IExercise;
    reps: number;
    duration: number;
    weight: number;
    type: SetType;
}

export type ICreateSet = Pick<ISet, 'reps' | 'weight' | 'duration' | 'type' | 'exercise'>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;