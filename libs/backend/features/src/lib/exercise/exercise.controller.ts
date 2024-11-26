import { Controller, Request } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { IExercise } from '@comp-gym/shared/api';

@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Get('')
    getAll(): Promise<IExercise[]> {
        return this.exerciseService.getAll();
    }

    @Get(':id')
    getById(@Param(':id') id: string): Promise<IExercise | null> {
        return this.exerciseService.getById(id);
    }

    @Post('')
    create(@Request() req: any): Promise<IExercise | null> {
        return this.exerciseService.create(req);
    }

    @Put(':id')
    update(@Param(':id') id: string, @Request() req: any): Promise<IExercise | null> {
        return this.exerciseService.update(id, req);
    }

    @Delete(':id')
    delete(@Param(':id') id: string): Promise<null> {
        return this.exerciseService.delete(id);
    }
}