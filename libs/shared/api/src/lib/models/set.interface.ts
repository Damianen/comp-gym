import { IExercise } from "./exercise.interface";
import { IEntity } from "./Entity.interface";

export enum SetType {
    Drop = 'Drop',
    Super = 'Super',
    WarmUp = 'WarmUp',
    Normal = 'Normal'
}

export interface ISet extends IEntity {
    exercise: IExercise | null;
    reps: number;
    duration: number;
    weight: number;
    type: SetType;
}

export type ICreateSet = Pick<ISet, 'reps' | 'weight' | 'duration' | 'type' | 'exercise'>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;