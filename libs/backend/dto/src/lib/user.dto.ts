import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { INeo4jUser, IUser } from '@comp-gym/shared/api';

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

export class Neo4jUserDto implements INeo4jUser {
	@IsString()
	@IsNotEmpty()
	_id!: string;
}
