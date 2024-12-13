import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import { IUser, IUserCredentials, IUserIdentity } from '@comp-gym/shared/api';
import { UserDto } from '@comp-gym/backend/dto';
import { UserExistGuard } from '@comp-gym/backend/user';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('login')
	async login(@Body() credentials: IUserCredentials): Promise<IUserIdentity> {
		return await this.authService.login(credentials);
	}

	@Public()
	@UseGuards(UserExistGuard)
	@Post('register')
	async register(@Body() user: UserDto): Promise<IUserIdentity> {
		return await this.authService.register(user);
	}
}