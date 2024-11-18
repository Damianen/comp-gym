import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ICreateUser, IUpdateUser, IUpsertUser } from '@comp-gym/shared/api';

export class CreateUserDto implements ICreateUser {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;
}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsBoolean()
    @IsNotEmpty()
    doesCardio!: boolean;

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date;
}

export class UpdateUserDto implements IUpdateUser {
    @IsString()
    @IsOptional()
    firstName!: string;

    @IsString()
    @IsOptional()
    lastName!: string;

    @IsBoolean()
    @IsOptional()
    completed!: boolean;
}
