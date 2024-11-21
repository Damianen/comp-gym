import { Id } from "./id.type";
import { ISet } from "./set.interface";

export enum ExerciseType {
    BodyWheight = 'BodyWheigt',
    Cardio = 'Cardio',
    Machine = 'Machine',
    FreeWheight = 'FreeWeight',
    Cable = 'Cable',
    Stretch = 'Stretch',
    Other = 'Other'
}

export interface IExerciseIdentity {
    _id: Id;
    number: number;
    name: string;
    description: string;
    exerciseType: ExerciseType;
}

export interface IExercise extends IExerciseIdentity {
    sets: ISet[];
}

export type ICreateExercise = Pick<IExercise, 'name'>;
export type IUpdateExercise = Partial<Omit<IExercise, 'id'>>;
export type IUpsertExercise = IExercise;