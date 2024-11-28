import { HttpException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Workout as WorkoutModel, WorkoutDocument } from './workout.schema';
import { IWorkout } from "@comp-gym/shared/api";
import { WorkoutDto } from "@comp-gym/backend/dto";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectModel(WorkoutModel.name) private workoutModel: Model<WorkoutDocument>
    ) {}

    async getAll(): Promise<IWorkout[]> {
        const items = await this.workoutModel
            .find()
            .populate('sets', 'user')
            .exec();
        return items;
    }

    async getById(_id: string): Promise<IWorkout | null> {
        const item = await this.workoutModel
            .findOne({ _id })
            .populate('sets', 'user')
            .exec();
        return item;
    }

    async create(workout: WorkoutDto): Promise<IWorkout> {
        console.log(workout);
        const createdItem = this.workoutModel.create(workout);
        return createdItem;
    }

    async update(_id: string, workout: WorkoutDto): Promise<IWorkout | null> {
        console.log(workout);
        return this.workoutModel.findByIdAndUpdate({ _id }, workout);
    }

    async delete(_id: string): Promise<IWorkout | null> {
        return this.workoutModel.findByIdAndDelete({ _id });
    }
}