/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { getYjsDoc, syncedStore } from "@syncedstore/core";
// @ts-ignore
import { createContext } from "react";
import { WebsocketProvider } from "y-websocket";
import { reduxStore, setStatus } from "./reduxStore";

export const ConnectionStatusContext = createContext(null);

export interface Note {
  id: string;
  description: string;
  done: boolean;
  lastUpdatedBy: string;
  cost?: number;
  children?: Note[];
  detailedDescription?: string;
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

wsProvider.on("status", (event: { status: string }) => {
  console.log("status", event.status); // logs "connected", "connecting" or "disconnected"
  reduxStore.dispatch(setStatus(event.status));
});
