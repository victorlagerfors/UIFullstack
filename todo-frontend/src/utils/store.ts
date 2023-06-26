import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";

console.log("creating store");
// Create your SyncedStore store
export const store = syncedStore({
  notes: [] as { description: string; checked: boolean }[],
});

const doc = getYjsDoc(store);

const wsProvider = new WebsocketProvider("ws://localhost:3000", "notes", doc);

wsProvider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
});
