import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ExerciseType, IExercise, INeo4jExercise, ISetAmount } from '@comp-gym/shared/api';

export class ExerciseDto implements IExercise {
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

export class Neo4jExerciseDto implements INeo4jExercise {
	@IsString()
	@IsNotEmpty()
	_id!: string;
}

export class SetAmountDto implements ISetAmount {
	@IsString()
	@IsNotEmpty()
	exerciseId!: string;

	@IsString()
	@IsNotEmpty()
	userId!: string;
}
