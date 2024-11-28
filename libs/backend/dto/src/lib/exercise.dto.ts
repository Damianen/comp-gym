import { IsNotEmpty, IsString, IsNumber } from "class-validator"; 
import { ICreateExercise, IUpdateExercise, IUpsertExercise, ExerciseType, IExercise } from "@comp-gym/shared/api";

export class CreateExerciseDto implements IUpsertExercise {

    _id!: string;

    @IsNumber()
    @IsNotEmpty()
    number!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    exerciseType!: ExerciseType;
}

export class UpdateExerciseDto implements IUpdateExercise {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    exerciseType!: ExerciseType;
}