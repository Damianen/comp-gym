import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards, Put, Delete, Options, HttpCode  } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { IWorkout } from '@comp-gym/shared/api';
import { WorkoutDto } from '@comp-gym/backend/dto';

@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Get('')
    getAll(): Promise<IWorkout[]> {
        return this.workoutService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<IWorkout | null> {
        return this.workoutService.getById(id);
    }

    @Post('')
    create(@Body() req: WorkoutDto): Promise<IWorkout> {
        return this.workoutService.create(req);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() req: WorkoutDto): Promise<IWorkout | null> {
        return this.workoutService.update(id, req);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IWorkout | null> {
        return this.workoutService.delete(id);
    }
}