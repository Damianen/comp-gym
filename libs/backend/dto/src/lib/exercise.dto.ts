import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ExerciseType, IExercise } from '@comp-gym/shared/api';

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
