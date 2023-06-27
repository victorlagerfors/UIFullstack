import { Injectable } from '@nestjs/common';
import { MongodbPersistence } from 'y-mongodb-provider';

@Injectable()
export class MongodbPersistenceService {
  private readonly mdb: MongodbPersistence;

  constructor() {
    const mongodbUrl = process.env.MONGODB_URL;
    if (!mongodbUrl) {
      throw new Error('Please set MONGODB_URL in your environment variables.');
    }

    this.mdb = new MongodbPersistence(mongodbUrl, {
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
