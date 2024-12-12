import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards, Put, Delete, Options, HttpCode  } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { IWorkout } from '@comp-gym/shared/api';
import { WorkoutDto, SetDto } from '@comp-gym/backend/dto';

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

    @Put(':id/exercise/:exerciseId')
    addExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string): Promise<IWorkout | null> {
        return this.workoutService.addExercise(id, exerciseId);
    }

    @Delete(':id/exercise/:exerciseId')
    removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseIndex: number): Promise<IWorkout | null> {
        return this.workoutService.removeExercise(id, exerciseIndex);
    }

    @Put(':id/set/:exerciseIndex')
    addSet(@Body() set: SetDto, @Param('id') id: string, @Param('exerciseIndex') exerciseIndex: number): Promise<IWorkout | null> {
        return this.workoutService.addSet(id, exerciseIndex, set);
    }

    @Delete(':id/set/:exerciseIndex/:setIndex')
    removeSet(@Param('id') id: string, @Param('exerciseIndex') exerciseIndex: number, @Param('setIndex') setIndex: number): Promise<IWorkout | null> {
        return this.workoutService.deleteSet(id, exerciseIndex, setIndex);
    }
}