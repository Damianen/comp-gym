import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Neo4jExerciseService } from './neo4j-exercise.service';
import { Neo4jExerciseDto, SetAmountDto } from '@comp-gym/backend/dto';

@Controller('neo4j/exercise')
export class Neo4JExerciseController {
	constructor(private readonly neo4jService: Neo4jExerciseService) {}

	@Post('')
	async createExercise(@Body() newExercise: Neo4jExerciseDto): Promise<any> {
		const results = await this.neo4jService.createExercise(newExercise);
		return results;
	}

	@Delete(':id')
	async deleteUser(@Param('id') _id: string): Promise<any> {
		const results = await this.neo4jService.deleteExercise(_id);
		return results;
	}

	@Post('amount/add')
	async addAmount(@Body() createAmountDto: SetAmountDto): Promise<any> {
		const results = await this.neo4jService.addSetAmount(createAmountDto);
		return results;
	}

	@Post('amount/remove')
	async removeAmount(@Body() createAmountDto: SetAmountDto): Promise<any> {
		const results = await this.neo4jService.removeSetAmount(createAmountDto);
		return results;
	}

	@Post('amount/remove/:amount')
	async removeAmountNum(@Body() createAmountDto: SetAmountDto, @Param('amount') amount: number): Promise<any> {
		const results = await this.neo4jService.removeSetAmountNum(createAmountDto, amount);
		return results;
	}

	@Get(':ExerciseId/amount/:userId')
	async getAmount(@Param('ExerciseId') exerciseId: string, @Param('userId') userId: string): Promise<number> {
		const results = await this.neo4jService.getAmountFromUser({ userId: userId, exerciseId: exerciseId });
		return results;
	}
}
