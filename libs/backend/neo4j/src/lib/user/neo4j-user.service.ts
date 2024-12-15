import { Injectable } from '@nestjs/common';
import { Neo4jUserDto } from '@comp-gym/backend/dto';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jUserService {
	constructor(private readonly neo4jService: Neo4jService) {}

	async createUser(createUser: Neo4jUserDto): Promise<void> {
		await this.neo4jService.write(`CREATE (u:User {_id: '${createUser._id}'})`);
	}

	async deleteUser(_id: string): Promise<void> {
		await this.neo4jService.write(`MATCH (u:User {_id: '${_id}'}) DELETE u`);
	}

	async getRecommendedExercisesForUser(_id: string): Promise<Array<string>> {
		const results = await this.neo4jService.read(
			`MATCH (u:User {_id: "${_id}"})-[a1:AMOUNT]->(commonExercise:Exercise)<-[a2:AMOUNT]-(otherUser:User)
            WHERE a1.amount >= 5 AND a2.amount >= 5

            MATCH (otherUser)-[r3:AMOUNT]->(recommendedExercise:Exercise)
            WHERE r3.amount >= 3
            AND NOT EXISTS {
                MATCH (u)-[:AMOUNT]->(recommendedExercise)
            }

            RETURN DISTINCT recommendedExercise._id AS exerciseId
            LIMIT 3`
		);

		const recommendedExercises = results.records.map((record: any) => record._fields[0]);
		return recommendedExercises;
	}
}
