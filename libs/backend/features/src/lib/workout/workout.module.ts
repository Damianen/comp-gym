import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserModel, UserSchema } from '@comp-gym/backend/user';
import { Workout as WorkoutModel, WorkoutSchema } from './workout.schema';
import { Exercise as ExerciseModel, ExerciseSchema } from '../exercise/exercise.schema';
import { ExerciseService } from '../exercise/exercise.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: WorkoutModel.name, schema: WorkoutSchema },
            { name: UserModel.name, schema: UserSchema },
            { name: ExerciseModel.name, schema: ExerciseSchema },
        ]),
    ],
    controllers: [WorkoutController],
    providers: [WorkoutService, ExerciseService],
    exports: [WorkoutService]
})
export class WorkoutModule {}