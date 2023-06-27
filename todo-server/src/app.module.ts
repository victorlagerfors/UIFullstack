import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './note/note.module';
import { MongodbPersistenceService } from './mongodb-persistence/mongodb-persistence.service';
import { MongodbPersistenceGateway } from './mongodb-persistence/mongodb-persistence.gateway';
import { MongodbPersistenceModule } from './mongodb-persistence/mongodb-persistence.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    NoteModule,
    MongodbPersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
