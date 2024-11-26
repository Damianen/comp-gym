import { HttpException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Workout as WorkoutModel, WorkoutDocument } from './workout.schema';
import { IWorkout } from "@comp-gym/shared/api";
import { CreateWorkoutDto, UpdateWorkoutDto } from "@comp-gym/backend/dto";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectModel(WorkoutModel.name) private workoutModel: Model<WorkoutDocument>
    ) {}

    async getAll(): Promise<IWorkout[]> {
        const items = await this.workoutModel
            .find()
            .populate('exercises', 'user')
            .exec();
        return items;
    }

    async getById(_id: string): Promise<IWorkout | null> {
        const item = await this.workoutModel
        .findOne({ _id })
        .populate('exercise', 'user')
        .exec();
        return item;
    }

    async create(workout: CreateWorkoutDto): Promise<IWorkout | null> {
        
        // TODO: add user to workout when creating

        if (workout) {
            const createdItem = {
                ...workout,
                number: Math.random() * 100000000,
                user: null,
                sets: [],
            }

            return this.workoutModel.create(createdItem);
        }

        return null;
    }

    async update(_id: string, workout: UpdateWorkoutDto): Promise<IWorkout | null> {
        return this.workoutModel.findByIdAndUpdate({ _id }, workout);
    }

    async delete(_id: string): Promise<null> {
        this.workoutModel.findByIdAndDelete({ _id });
        return null;
    }
}