import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PusherState = {
  connected: boolean;
  paymetStatus?: boolean;
  channel: string | null;
  event: string | null;
  data: any;
};

const initialState: PusherState = {
  connected: false,
  paymetStatus: false,
  channel: null,
  event: null,
  data: null,
};

const pusherSlice = createSlice({
  name: "pusher",
  initialState,
  reducers: {
    setPusherState: (
      state,
      action: PayloadAction<{
        pusher: {
          connected: boolean;
          paymetStatus?: boolean;
          channel: string | null;
          event: string | null;
          data: any;
        };
      }>,
    ) => {
      state.connected = action.payload.pusher.connected;
      state.paymetStatus =
        action.payload.pusher.paymetStatus ?? state.paymetStatus;
      state.channel = action.payload.pusher.channel;
      state.event = action.payload.pusher.event;
      state.data = action.payload.pusher.data;
    },

    resetPusherState: (state) => {
      state.connected = false;
      state.paymetStatus = false;
      state.channel = null;
      state.event = null;
      state.data = null;
    },
  },
});

export const { setPusherState, resetPusherState } = pusherSlice.actions;
export const pusherReducer = pusherSlice.reducer;
