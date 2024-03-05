import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import playlistReducer from './playlistSlice';
import upcomingReducer from './upcomingSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    upcoming: upcomingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
