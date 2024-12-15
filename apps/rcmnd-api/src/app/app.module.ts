import { Neo4jBackendModule } from '@comp-gym/neo4j';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';

@Module({
	imports: [
		Neo4jModule.forRoot({
			host: process.env.NEO4J_URI,
			port: 7687,
			username: process.env.NEO4J_USERNAME,
			password: process.env.NEO4J_PASSWORD,
			scheme: 'bolt+s',
		}),
		Neo4jBackendModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
