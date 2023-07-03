import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

//Logic for connection state
interface ConnectionState {
  status: string;
}

const initialState: ConnectionState = {
  status: "disconnected",
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: { name: "string" },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setStatus } = connectionSlice.actions;
export const { setName } = userSlice.actions;

export default connectionSlice.reducer;

export const reducer = {
  connection: connectionSlice.reducer,
  user: userSlice.reducer,
};

export const reduxStore = configureStore({ reducer });

export type RootState = ReturnType<typeof reduxStore.getState>;
