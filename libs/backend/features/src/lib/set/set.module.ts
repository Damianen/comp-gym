import { Module } from '@nestjs/common';
import { SetController } from './set.controller';
import { SetService } from './set.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Set as SetModel, SetSchema } from './set.schema';
import { Exercise as ExerciseModel, ExerciseSchema } from '../exercise/exercise.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SetModel.name, schema: SetSchema },
        ]),
    ],
    controllers: [SetController],
    providers: [SetService],
    exports: [SetService]
})
export class SetModule {}