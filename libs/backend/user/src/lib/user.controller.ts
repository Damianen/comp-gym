import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@comp-gym/shared/api';
import { UserDto } from '@comp-gym/backend/dto';
import { UserExistGuard } from './user-exists.guard';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get(':id')
	getOne(@Param('id') id: string): Promise<IUser | null> {
		return this.userService.getById(id);
	}

	@Post('')
	@UseGuards(UserExistGuard)
	create(@Body() user: UserDto): Promise<IUser> {
		return this.userService.create(user);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() user: UserDto): Promise<IUser | null> {
		return this.userService.update(id, user);
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<IUser | null> {
		return this.userService.delete(id);
	}
}
