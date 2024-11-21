import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeaturesUserModule } from '@comp-gym/backend/features';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BackendFeaturesUserModule,
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
