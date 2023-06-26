import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';
import * as Y from 'yjs';
import { MongodbPersistenceService } from './mongodb-persistence.service';
import { Logger } from '@nestjs/common';
import { setPersistence, setupWSConnection } from 'y-websocket/bin/utils';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/notes',
})
export class MongodbPersistenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private ydocs: Map<string, Y.Doc> = new Map();
  private docName = 'default';

  constructor(
    private readonly mongodbPersistenceService: MongodbPersistenceService,
  ) {}

  afterInit() {
    Logger.log('Gateway initialized', 'WebSocketGateway');
  }

  async handleConnection(client: any, ...args: any[]) {
    Logger.log('Client connected', 'WebSocketGateway');
    const req = client.upgradeReq; // Attempt to access the upgrade request object
    //setupWSConnection(client, req);
    console.log(client);
    setupWSConnection(client, req, { docName: this.docName });
    setPersistence({
      bindState: async (docName, ydoc) => {
        const persistedYdoc = await this.mongodbPersistenceService.getYDoc(
          docName,
        );
        const newUpdates = Y.encodeStateAsUpdate(ydoc);
        this.mongodbPersistenceService.storeUpdate(docName, newUpdates);
        Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc));
        ydoc.on('update', async (update) => {
          this.mongodbPersistenceService.storeUpdate(docName, update);
        });
      },
      writeState: async (docName, ydoc) => {},
    });
  }

  handleDisconnect(client: any) {
    Logger.log('Client disconnected', 'WebSocketGateway');
    this.ydocs.delete(client.id);
  }
}
