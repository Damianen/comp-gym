import { Id } from "./id.type";
import { ISet } from "./set.interface";

export enum ExersizeType {
    Cardio = 'Cardio',
    BodyWheight = 'BodyWheigt',
    Machine = 'Machine',
    FreeWheight = 'FreeWeight',
    Cable = 'Cable',
    Stretch = 'Stretch'
}

export enum Measurement {
    Reps = 'Reps',
    RepsWeight = 'RepsWeight',
    Time = 'Time'
}

export interface IExersizeIdentity {
    _id: Id;
    name: string;
    measurement: Measurement;
    exersizeType: ExersizeType;
}

export interface IExersize extends IExersizeIdentity {
    sets: ISet;
}

export type ICreateExersize = Pick<IExersize, 'name'>;
export type IUpdateExersize = Partial<Omit<IExersize, 'id'>>;
export type IUpsertExersize = IExersize;