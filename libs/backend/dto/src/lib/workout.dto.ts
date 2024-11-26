import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate, IsNumber } from "class-validator"; 
import { ICreateWorkout, ISet, IUpdateWorkout, IUpsertWorkout, IUser, IWorkoutIdentity, WorkoutType } from "@comp-gym/shared/api";

export class CreateWorkoutDto  implements ICreateWorkout {
    
    @IsString()
    @IsNotEmpty()
    name!: string; 

    @IsString()
    @IsNotEmpty()
    description!: string;
        
    @IsString()
    @IsNotEmpty()
    type!: WorkoutType;
}

export class UpsertWorkoutDto implements IUpsertWorkout {

    @IsString()
    @IsNotEmpty()
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

export class UpdateWorkoutDto implements IUpdateWorkout {
    @IsString()
    @IsOptional()
    name!: string; 

    @IsString()
    @IsOptional()
    description!: string;
        
    @IsString()
    @IsOptional()
    type!: WorkoutType;

    @IsNumber()
    @IsOptional()
    duration!: number;

    @IsBoolean()
    @IsOptional()
    favorite!: boolean;

    sets!: ISet[];

    user!: IUser;
}