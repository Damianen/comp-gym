import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Neo4jUserService } from './neo4j-user.service';
import { Neo4jUserDto } from '@comp-gym/backend/dto';

@Controller('neo4j/user')
export class Neo4jUserController {
	constructor(private readonly neo4jService: Neo4jUserService) {}

	@Post('')
	async createUser(@Body() newUser: Neo4jUserDto): Promise<any> {
		const results = await this.neo4jService.createUser(newUser);
		return results;
	}

	@Delete(':id')
	async deleteUser(@Param('id') _id: string): Promise<any> {
		const results = await this.neo4jService.deleteUser(_id);
		return results;
	}

	@Get(':id/recommend')
	async getRecommendedExercisesForUser(@Param('id') _id: string): Promise<any> {
		const results = await this.neo4jService.getRecommendedExercisesForUser(_id);
		return results;
	}
}
