import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/schemas/note.schema';
import { MongodbPersistenceService } from './mongodb-persistence.service';
import { MongodbPersistenceGateway } from './mongodb-persistence.gateway';

@Module({
  providers: [MongodbPersistenceService, MongodbPersistenceGateway],
})
export class MongodbPersistenceModule {}
