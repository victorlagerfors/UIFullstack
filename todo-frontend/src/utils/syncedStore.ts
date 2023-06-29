/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { syncedStore, getYjsDoc } from "@syncedstore/core";
// @ts-ignore
import { WebsocketProvider } from "y-websocket";
import { createContext } from "react";
import { setStatus, reduxStore } from "./reduxStore";

export const ConnectionStatusContext = createContext(null);

export interface Note {
  id: string;
  description: string;
  done: boolean;
  lastUpdatedBy: string;
  cost?: number;
  children?: Note[];
}

export interface List {
  id: string;
  title: string;
  notes: Note[];
  frozen?: string;
}

export const synchronizedStore: { lists: List[] } = syncedStore({
  lists: [] as List[],
});

const doc = getYjsDoc(synchronizedStore);

// Use the environment variable
const wsUrl = import.meta.env.VITE_WS_URL;
if (!wsUrl) {
  throw new Error("Please set VITE_WS_URL in your environment variables.");
}

const wsProvider = new WebsocketProvider(wsUrl, "notes", doc);

wsProvider.on("status", (event) => {
  console.log("status", event.status); // logs "connected" or "disconnected"
  reduxStore.dispatch(setStatus(event.status));
});
