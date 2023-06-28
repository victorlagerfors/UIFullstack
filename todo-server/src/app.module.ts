import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbPersistenceModule } from './mongodb-persistence/mongodb-persistence.module';
@Module({
  imports: [MongodbPersistenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
