import { Id } from "./id.type";
import { IEntity } from "./Entity.interface";

export enum ExerciseType {
    BodyWheight = 'BodyWheigt',
    Cardio = 'Cardio',
    Machine = 'Machine',
    FreeWheight = 'FreeWeight',
    Cable = 'Cable',
    Stretch = 'Stretch',
    Other = 'Other'
}

export interface IExercise extends IEntity {
    number: number;
    name: string;
    description: string;
    exerciseType: ExerciseType;
}

export type ICreateExercise = Pick<IExercise, 'name' | 'description' | 'exerciseType'>;
export type IUpdateExercise = Partial<Omit<IExercise, 'id'>>;
export type IUpsertExercise = IExercise;