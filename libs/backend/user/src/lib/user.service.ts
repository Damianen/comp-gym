import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser } from '@comp-gym/shared/api';
import { UserDto } from '@comp-gym/backend/dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

	async getById(_id: string): Promise<IUser | null> {
		const item = await this.userModel.findOne({ _id }).exec();
		return item;
	}

	async findOneByEmail(email: string): Promise<IUser | null> {
		const item = this.userModel.findOne({ emailAddress: email }).select('-password').exec();
		return item;
	}

	async create(user: UserDto): Promise<IUser> {
		const createdItem = this.userModel.create(user);
		return createdItem;
	}

	async update(_id: string, user: UserDto): Promise<IUser | null> {
		return this.userModel.findByIdAndUpdate({ _id }, user);
	}

	async delete(_id: string): Promise<IUser | null> {
		return this.userModel.findByIdAndDelete({ _id });
	}
}
