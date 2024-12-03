import { IsNotEmpty, IsString, IsNumber } from "class-validator"; 
import { ICreateSet, IUpdateSet, IUpsertSet, SetType, IExercise } from "@comp-gym/shared/api";

export class CreateSetDto implements IUpsertSet {

    _id!: string;

    @IsNumber()
    @IsNotEmpty()
    reps!: number;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    weight!: number;

    @IsString()
    @IsNotEmpty()
    type!: SetType;
}

export class UpdateSetDto implements IUpdateSet {
    @IsNotEmpty()
    exercise!: IExercise;

    @IsNumber()
    @IsNotEmpty()
    reps!: number;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsNumber()
    @IsNotEmpty()
    weight!: number;

    @IsString()
    @IsNotEmpty()
    type!: SetType;
}