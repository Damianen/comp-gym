import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { IWorkout } from '@comp-gym/shared/api';

@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Get('')
    getAll(): Promise<IWorkout[]> {
        return this.workoutService.getAll();
    }

    @Get(':id')
    getById(@Param(':id') id: string): Promise<IWorkout | null> {
        return this.workoutService.getById(id);
    }
}