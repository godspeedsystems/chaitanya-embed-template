import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './index';
import { socketService } from './socket';

type SocketStatus = 'disconnected' | 'connecting' | 'connected';

interface SocketState {
  status: SocketStatus;
}

const initialState: SocketState = {
  status: 'disconnected',
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setSocketStatus } = socketSlice.actions;

export const connectSocket = () => (dispatch: AppDispatch) => {
  if (socketService.socket.connected) {
    return;
  }

  dispatch(setSocketStatus('connecting'));

  socketService.on('connect', () => {
    dispatch(setSocketStatus('connected'));
  });

  socketService.on('disconnect', () => {
    dispatch(setSocketStatus('disconnected'));
  });

  socketService.on('connect_error', () => {
    dispatch(setSocketStatus('disconnected'));
  });

  socketService.connect();
};

export const disconnectSocket = () => (dispatch: AppDispatch) => {
  socketService.disconnect();
  dispatch(setSocketStatus('disconnected'));
};

export default socketSlice.reducer;
