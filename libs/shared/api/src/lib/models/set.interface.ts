import { Id } from "./id.type";

export enum SetType {
    Drop = 'Drop',
    Super = 'Super',
    WarmUp = 'WarmUp',
    Normal = 'Normal'
}

export interface ISet {
    _id: Id;
    reps: number;
    duration: number;
    weight: number;
    type: SetType;
}

export type ICreateSet = Pick<ISet, 'reps'>;
export type IUpdateSet = Partial<Omit<ISet, 'id'>>;
export type IUpsertSet = ISet;