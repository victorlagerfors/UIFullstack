/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { syncedStore, getYjsDoc } from "@syncedstore/core";
// @ts-ignore
import { WebsocketProvider } from "y-websocket";

console.log("creating store");
// Create your SyncedStore store
export const store = syncedStore({
  notes: [] as { description: string; checked: boolean }[],
});

const doc = getYjsDoc(store);

// Use the environment variable
const wsUrl = import.meta.env.VITE_WS_URL;
if (!wsUrl) {
  throw new Error("Please set VITE_WS_URL in your environment variables.");
}

const wsProvider = new WebsocketProvider(wsUrl, "notes", doc);

wsProvider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
});
