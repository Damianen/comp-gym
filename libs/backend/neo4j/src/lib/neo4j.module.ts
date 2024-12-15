import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4jUserService } from './user/neo4j-user.service';
import { Neo4jUserController } from './user/neo4j-user.controller';
import { Neo4JExerciseController } from './exercise/neo4j-exercise.contoller';
import { Neo4jExerciseService } from './exercise/neo4j-exercise.service';

@Module({
	imports: [Neo4jModule],
	controllers: [Neo4jUserController, Neo4JExerciseController],
	providers: [Neo4jUserService, Neo4jExerciseService],
	exports: [],
})
export class Neo4jBackendModule {}
