import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IExercise, ExerciseType, ISet } from '@comp-gym/shared/api';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise implements IExercise {

    @IsMongoId()
    _id!: string;

    @Prop({ required: true, type: Number})
    number!: number;

    @Prop({ required: true, type: String})
    name!: string;

    @Prop({ required: true, type: String})
    description!: string;

    @Prop({ required: true, type: String, default: ExerciseType.Other})
    exerciseType!: ExerciseType;
   
    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'Set'})
    sets!: ISet[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);