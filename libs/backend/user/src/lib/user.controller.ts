import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@comp-gym/shared/api';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): Promise<IUser[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IUser | null> {
    return this.userService.getById(id);
  }
}
