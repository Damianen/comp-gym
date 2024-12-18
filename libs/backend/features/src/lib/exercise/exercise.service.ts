import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise as ExerciseModel, ExerciseDocument } from './exercise.schema';
import { IExercise } from '@comp-gym/shared/api';
import { ExerciseDto } from '@comp-gym/backend/dto';

@Injectable()
export class ExerciseService {
	constructor(
		@InjectModel(ExerciseModel.name)
		private exerciseModel: Model<ExerciseDocument>
	) {}

	async getAll(): Promise<IExercise[]> {
		const items = await this.exerciseModel.find().exec();
		return items;
	}

	async getById(_id: string): Promise<IExercise | null> {
		const item = await this.exerciseModel.findOne({ _id }).exec();
		return item;
	}

	async getByIdArray(ids: Array<string>): Promise<IExercise[]> {
		const items = await this.exerciseModel.find({ _id: { $in: ids } });
		return items;
	}

	async create(exercise: ExerciseDto): Promise<IExercise | null> {
		if (exercise) {
			const createdItem = {
				...exercise,
				number: Math.random() * 100000000,
			};

			return this.exerciseModel.create(createdItem);
		}

		return null;
	}

	async update(_id: string, exercise: ExerciseDto): Promise<IExercise | null> {
		return this.exerciseModel.findByIdAndUpdate({ _id }, exercise);
	}

	async delete(_id: string): Promise<IExercise | null> {
		return this.exerciseModel.findByIdAndDelete({ _id });
	}
}
