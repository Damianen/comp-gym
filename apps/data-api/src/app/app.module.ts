import { Module } from '@nestjs/common';
import { UserModule } from '@comp-gym/backend/user';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule, ExerciseModule } from '@comp-gym/backend/features';
import { AuthModule } from '@comp-gym/auth';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4jBackendModule } from '@comp-gym/neo4j';
import { ConditionalModule } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
		WorkoutModule,
		ExerciseModule,
		AuthModule,
		MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
			connectionFactory: (connection) => {
				connection.on('connected', () => {
					console.log('Connected to DB');
				});
				connection._events.connected();
				return connection;
			},
		}),
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
