import { IEntity } from "./Entity.interface";
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

export interface IExerciseIdentity extends IEntity {
    number: number;
    name: string;
    description: string;
    exerciseType: ExerciseType;
}

export interface IExercise extends IExerciseIdentity {
    sets: ISet[] | null;
}

export type ICreateExercise = Pick<IExercise, 'name' | 'description' | 'exerciseType'>;
export type IUpdateExercise = Partial<Omit<IExercise, 'id'>>;
export type IUpsertExercise = IExercise;