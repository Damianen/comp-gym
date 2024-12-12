import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IWorkout, WorkoutType, ISet, IUser, IExercise, IWorkoutExercise, SetType } from '@comp-gym/shared/api';
import { IsMongoId } from 'class-validator';

export type WorkoutDocument = Workout & Document;

@Schema()
export class Workout implements IWorkout {
    @IsMongoId()
    _id!: string;

    @Prop({ required: true, type: Number, select: true, unique: true})
    number!: number;

    @Prop({ required: true, type: String})
    name!: string;

    @Prop({ required: true, type: String})
    description!: string;

    @Prop({ required: true, type: String})
    duration!: number;
    
    @Prop({ required: true, type: Date})
    date!: Date;

    @Prop({ required: true, type: String, default: WorkoutType.WeightLifting})
    type!: WorkoutType;

    @Prop({ required: true, type: Boolean, default: false })
    favorite!: boolean;

    @Prop({ required: false, type: Array})
    exercises!: WorkoutExercise[];

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user!: IUser;
}

@Schema()
export class WorkoutExercise implements IWorkoutExercise{
    
    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'Exercise'})
    exercise!: IExercise;

    @Prop({ required: false, type: Array, ref: 'Sets'})
    sets!: Set[];
}

@Schema()
export class Set implements ISet {
    @Prop({ required: true, type: Number})
    reps!: number;

    @Prop({ required: true, type: Number})
    duration!: number;

    @Prop({ required: true, type: Number})
    weight!: number;

    @Prop({ required: true, type: String, default: SetType.Normal})
    type!: SetType;
   
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);