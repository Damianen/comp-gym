import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise as ExerciseModel, ExerciseSchema } from './exercise.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ExerciseModel.name, schema: ExerciseSchema }]),
		JwtModule.register({
			secret: process.env['JWT_SECRET'],
			signOptions: { expiresIn: '12 days' },
		}),
	],
	controllers: [ExerciseController],
	providers: [ExerciseService],
	exports: [ExerciseService],
})
export class ExerciseModule {}
