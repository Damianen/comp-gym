import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate, IsNumber } from "class-validator"; 
import { ICreateWorkout, ISet, IUpdateWorkout, IUpsertWorkout, IUser, IWorkout, IWorkoutIdentity, WorkoutType } from "@comp-gym/shared/api";

export class WorkoutDto implements IWorkout {

    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string; 

    @IsString()
    @IsNotEmpty()
    description!: string;
        
    @IsString()
    @IsNotEmpty()
    type!: WorkoutType;

    @IsNumber()
    @IsNotEmpty()
    number!: number;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsBoolean()
    @IsNotEmpty()
    favorite!: boolean;

    sets!: ISet[];

    user!: IUser;
}