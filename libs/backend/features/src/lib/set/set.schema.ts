import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { SetType, ISet, IExercise } from '@comp-gym/shared/api';

export type SetDocument = Set & Document;

@Schema()
export class Set implements ISet {
    @IsMongoId()
    _id!: string;

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'Exercise' })
    exercise!: IExercise;

    @Prop({ required: true, type: Number})
    reps!: number;

    @Prop({ required: true, type: Number})
    duration!: number;

    @Prop({ required: true, type: Number})
    weight!: number;

    @Prop({ required: true, type: String, default: SetType.Normal})
    type!: SetType;
   
}

export const SetSchema = SchemaFactory.createForClass(Set);