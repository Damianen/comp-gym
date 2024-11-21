import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser } from '@comp-gym/shared/api';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
    ) {}

    async getAll(): Promise<IUser[]> {
        const items = await this.userModel.find();
        return items;
    }

    async getById(_id: string): Promise<IUser | null> {
        const item = await this.userModel.findOne({ _id }).exec();
        return item;
    }
}
