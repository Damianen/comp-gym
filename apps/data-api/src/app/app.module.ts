import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@comp-gym/backend/user';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule, ExerciseModule } from '@comp-gym/backend/features';
import { AuthModule } from '@comp-gym/auth';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
