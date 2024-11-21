import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IUser } from '@comp-gym/shared/api';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  @IsMongoId()
  _id!: string;

  @Prop({required: true, type: String })
  firstName!: string;

  @Prop({required: true, type: String})
  lastName!: string;

  @Prop({required: false, type: Number})
  height!: number;

  @Prop({required: true, type: String, select: false})
  password = '';

  @Prop({required: true, type: String, select: false, unique: true})
  email!: string;
  
  @Prop({required: true, type: Boolean, default: true})
  doesCardio!: boolean;

  @Prop({required: false, type: Number})
  weight!: number;

  @Prop({required: false, type: Date})
  birthdate!: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
