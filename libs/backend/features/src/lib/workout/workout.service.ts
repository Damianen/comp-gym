import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workout as WorkoutModel, WorkoutDocument } from './workout.schema';
import { IWorkout, IExercise, ISet, IUser } from '@comp-gym/shared/api';
import { WorkoutDto } from '@comp-gym/backend/dto';
import { ExerciseService } from '../exercise/exercise.service';
import { User as UserModel, UserDocument } from '@comp-gym/backend/user';

@Injectable()
export class WorkoutService {
	constructor(
		@InjectModel(WorkoutModel.name)
		private workoutModel: Model<WorkoutDocument>,
		@InjectModel(UserModel.name)
		private userModel: Model<UserDocument>,
		private exerciseService: ExerciseService
	) {}

	async getAll(req: any): Promise<IWorkout[]> {
		const items = await this.workoutModel.find().populate('user', 'exercises').exec();
		return items.filter((item) => item.user._id == req['user']['user_id']);
	}

	async getById(_id: string): Promise<IWorkout | null> {
		const item = await this.workoutModel.findOne({ _id }).populate('user', 'exercises').exec();
		return item;
	}

	async create(req: any, workout: WorkoutDto): Promise<IWorkout> {
		workout.user = (await this.userModel.findById(req['user']['user_id'])) as IUser;
		const createdItem = this.workoutModel.create(workout);
		return createdItem;
	}

	async update(_id: string, workout: WorkoutDto): Promise<IWorkout | null> {
		return this.workoutModel.findByIdAndUpdate({ _id }, workout);
	}

	async delete(_id: string): Promise<IWorkout | null> {
		return this.workoutModel.findByIdAndDelete({ _id });
	}

	async addExercise(_id: string, exerciseId: string): Promise<IWorkout | null> {
		const workout = await this.workoutModel.findOne({ _id }).populate('exercises', 'user').exec();

		const exercise = (await this.exerciseService.getById(exerciseId)) as IExercise;

		workout?.exercises.push({
			exercise: exercise,
			sets: [],
		});

		return this.workoutModel.findByIdAndUpdate({ _id }, workout as WorkoutDto);
	}

	async removeExercise(_id: string, exerciseIndex: number): Promise<IWorkout | null> {
		const workout = await this.workoutModel.findOne({ _id }).populate('exercises', 'user').exec();

		workout?.exercises.splice(exerciseIndex, 1);

		return this.workoutModel.findByIdAndUpdate({ _id }, workout as IWorkout);
	}

	async addSet(_id: string, exerciseIndex: number, set: ISet): Promise<IWorkout | null> {
		const workout = await this.workoutModel.findOne({ _id }).populate('exercises', 'user').exec();

		workout?.exercises[exerciseIndex].sets.push(set);

		return this.workoutModel.findByIdAndUpdate({ _id }, workout as IWorkout);
	}

	async deleteSet(_id: string, exerciseIndex: number, setIndex: number): Promise<IWorkout | null> {
		const workout = await this.workoutModel.findOne({ _id }).populate('exercises', 'user').exec();

		workout?.exercises[exerciseIndex].sets.splice(setIndex, 1);

		return this.workoutModel.findByIdAndUpdate({ _id }, workout as IWorkout);
	}
}
