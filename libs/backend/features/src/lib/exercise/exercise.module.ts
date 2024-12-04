import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise as ExerciseModel, ExerciseSchema } from './exercise.schema';
import { Set as SetModel, SetSchema } from '../set/set.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ExerciseModel.name, schema: ExerciseSchema },
            { name: SetModel.name, schema: SetSchema },
        ]),
    ],
    controllers: [ExerciseController],
    providers: [ExerciseService],
    exports: [ExerciseService]
})
export class ExerciseModule {}