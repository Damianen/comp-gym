import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards, Put, Delete, Options, HttpCode } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { IWorkout } from '@comp-gym/shared/api';
import { WorkoutDto, SetDto } from '@comp-gym/backend/dto';
import { AuthGuard, IsWorkoutFromUserGuard } from '../auth.guard';

@Controller('workout')
@UseGuards(AuthGuard)
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get('')
	getAll(@Request() req: any): Promise<IWorkout[]> {
		return this.workoutService.getAll(req);
	}

	@Get(':id')
	@UseGuards(IsWorkoutFromUserGuard)
	getById(@Param('id') id: string): Promise<IWorkout | null> {
		return this.workoutService.getById(id);
	}

	@Post('')
	create(@Request() req: any, @Body() body: WorkoutDto): Promise<IWorkout> {
		return this.workoutService.create(req, body);
	}

	@Put(':id')
	@UseGuards(IsWorkoutFromUserGuard)
	update(@Param('id') id: string, @Body() req: WorkoutDto): Promise<IWorkout | null> {
		return this.workoutService.update(id, req);
	}

	@Delete(':id')
	@UseGuards(IsWorkoutFromUserGuard)
	delete(@Param('id') id: string): Promise<IWorkout | null> {
		return this.workoutService.delete(id);
	}

	@Put(':id/exercise/:exerciseId')
	@UseGuards(IsWorkoutFromUserGuard)
	addExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string): Promise<IWorkout | null> {
		return this.workoutService.addExercise(id, exerciseId);
	}

	@Delete(':id/exercise/:exerciseId')
	@UseGuards(IsWorkoutFromUserGuard)
	removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseIndex: number): Promise<IWorkout | null> {
		return this.workoutService.removeExercise(id, exerciseIndex);
	}

	@Put(':id/set/:exerciseIndex')
	@UseGuards(IsWorkoutFromUserGuard)
	addSet(
		@Body() set: SetDto,
		@Param('id') id: string,
		@Param('exerciseIndex') exerciseIndex: number
	): Promise<IWorkout | null> {
		return this.workoutService.addSet(id, exerciseIndex, set);
	}

	@Delete(':id/set/:exerciseIndex/:setIndex')
	@UseGuards(IsWorkoutFromUserGuard)
	removeSet(
		@Param('id') id: string,
		@Param('exerciseIndex') exerciseIndex: number,
		@Param('setIndex') setIndex: number
	): Promise<IWorkout | null> {
		return this.workoutService.deleteSet(id, exerciseIndex, setIndex);
	}
}
