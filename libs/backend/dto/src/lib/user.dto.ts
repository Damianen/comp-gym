import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsBoolean,
	IsDate,
} from 'class-validator';
import { IUser } from '@comp-gym/shared/api';

export class UserDto implements IUser {
	_id!: string | null;

	@IsNotEmpty()
	@IsString()
	firstName!: string;

	@IsNotEmpty()
	@IsString()
	lastName!: string;

	@IsNotEmpty()
	@IsString()
	email!: string;

	@IsNotEmpty()
	@IsNumber()
	height!: number;

	@IsNotEmpty()
	@IsNumber()
	weight!: number;

	@IsNotEmpty()
	@IsDate()
	birthdate!: Date;

	@IsNotEmpty()
	@IsBoolean()
	doesCardio!: boolean;

	@IsNotEmpty()
	@IsString()
	password!: string;
}
