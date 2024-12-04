import { IsNotEmpty, IsString, IsNumber } from "class-validator"; 
import { ISet, SetType } from "@comp-gym/shared/api";

export class SetDto implements ISet {

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