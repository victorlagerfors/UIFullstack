import { Injectable } from '@nestjs/common';
import { MongodbPersistence } from 'y-mongodb-provider';

@Injectable()
export class MongodbPersistenceService {
  private readonly mdb: MongodbPersistence;

  constructor() {
    this.mdb = new MongodbPersistence('mongodb://localhost:27017/yjstest', {
      collectionName: 'transactions',
      flushSize: 100,
      multipleCollections: true,
    });
  }

  async getYDoc(docName: string) {
    return this.mdb.getYDoc(docName);
  }

  async storeUpdate(docName: string, update: any) {
    console.log(update);
    return this.mdb.storeUpdate(docName, update);
  }
}
