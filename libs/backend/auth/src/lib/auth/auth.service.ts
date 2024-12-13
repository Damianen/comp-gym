import { Injectable, Logger } from '@nestjs/common';
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { User as UserModel, UserDocument } from '@comp-gym/backend/user';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserIdentity } from '@comp-gym/shared/api';
import { UserDto } from '@comp-gym/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserCredentials } from '@comp-gym/shared/api';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name) private userModel: Model<UserDocument>,
		private jwtService: JwtService
	) {}

	async validateUser(credentials: IUserCredentials): Promise<any> {
		const user = await this.userModel.findOne({
			emailAddress: credentials.email,
		});
		if (user && user.password === credentials.password) {
			return user;
		}
		return null;
	}

	async login(credentials: IUserCredentials): Promise<IUserIdentity> {
		return await this.userModel
			.findOne({
				emailAddress: credentials.email,
			})
			.select('+password')
			.exec()
			.then((user) => {
				if (user && user.password === credentials.password) {
					const payload = {
						user_id: user._id,
					};
					return {
						_id: user._id,
						firstName: user.firstName,
						email: user.email,
						token: this.jwtService.sign(payload),
					};
				} else {
					const errMsg = 'Email not found or password invalid';
					throw new UnauthorizedException(errMsg);
				}
			})
			.catch((error) => {
				return error;
			});
	}

	async register(user: UserDto): Promise<IUserIdentity> {
		if (await this.userModel.findOne({ emailAddress: user.email })) {
			throw new ConflictException('User already exist');
		}
		const createdItem = await this.userModel.create(user);
		return createdItem;
	}
}
