import { Neo4jExerciseDto, SetAmountDto } from '@comp-gym/backend/dto';
import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jExerciseService {
	constructor(private readonly neo4jService: Neo4jService) {}

	async createExercise(createExercise: Neo4jExerciseDto): Promise<void> {
		await this.neo4jService.write(`CREATE (e:Exercise {_id: '${createExercise._id}'})`);
	}

	async deleteExercise(_id: string): Promise<void> {
		await this.neo4jService.write(`MATCH (e:Exercise {_id: '${_id}'}) DETACH DELETE e`);
	}

	async addSetAmount(setAmount: SetAmountDto) {
		const amount = await this.getAmountFromUser(setAmount);
		await this.updateSetAmount(setAmount, amount + 1);
	}

	async removeSetAmount(setAmount: SetAmountDto) {
		const amount = await this.getAmountFromUser(setAmount);
		await this.updateSetAmount(setAmount, amount - 1);
	}

	async removeSetAmountNum(setAmount: SetAmountDto, diff: number) {
		const amount = await this.getAmountFromUser(setAmount);
		await this.updateSetAmount(setAmount, amount - diff);
	}

	async updateSetAmount(setAmount: SetAmountDto, amount: number): Promise<void> {
		await this.neo4jService.write(
			`MERGE (u:User {_id: '${setAmount.userId}'})
            MERGE (e:Exercise {_id: '${setAmount.exerciseId}'})
            MERGE (u)-[a:AMOUNT]->(e)
            SET a.amount = ${amount}`
		);
	}

	async getAmountFromUser(setAmount: SetAmountDto): Promise<number> {
		const results = await this.neo4jService.read(
			`OPTIONAL MATCH (u:User {_id: '${setAmount.userId}'})-[a:AMOUNT]->(e:Exercise {_id: '${setAmount.exerciseId}'})
            RETURN a.amount AS amount`
		);
		const amount = results.records.map((record: any) => {
			if (record._fields[0] == null) {
				return record._fields[0];
			} else {
				return record._fields[0].low;
			}
		});
		return amount[0];
	}
}
