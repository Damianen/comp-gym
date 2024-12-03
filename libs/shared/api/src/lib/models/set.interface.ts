import { IExercise } from "./exercise.interface";
import { IEntity } from "./Entity.interface";

export enum SetType {
    Drop = 'Drop',
    Super = 'Super',
    WarmUp = 'WarmUp',
    Normal = 'Normal'
}

export interface ISet extends IEntity {
    reps: number;
    duration: number;
    weight: number;
    type: SetType;
}

export type ICreateSet = Pick<ISet, 'reps' | 'weight' | 'duration' | 'type'>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;