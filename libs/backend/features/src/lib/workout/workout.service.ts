import { HttpException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Workout as WorkoutModel, WorkoutDocument } from './workout.schema';
import { IWorkout } from "@comp-gym/shared/api";

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
}