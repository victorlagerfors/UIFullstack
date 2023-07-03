import { Module } from '@nestjs/common';
import { MongodbPersistenceGateway } from './mongodb-persistence.gateway';
import { MongodbPersistenceService } from './mongodb-persistence.service';

@Module({
  providers: [MongodbPersistenceService, MongodbPersistenceGateway],
})
export class MongodbPersistenceModule {}
