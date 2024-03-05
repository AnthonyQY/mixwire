import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Audio {
  id: string;
  name: string;
  artist: string;
  audioString: string;
  imageString: string;
}

interface UpcomingState {
  upcomingAudioList: Audio[];
  currentlyPlayingAudioList: Audio[];
}

const initialState: UpcomingState = {
  upcomingAudioList: [],
  currentlyPlayingAudioList: [],
};

export const UpcomingSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {
    addUpcomingAudio: (state: any, action: PayloadAction<any>) => {
      state.upcomingAudioList.push(action.payload);
    },
    removeUpcomingAudioByID: (state: any, action: PayloadAction<any>) => {
      state.upcomingAudioList = state.upcomingAudioList.filter(
        (x: any) => x.id !== action.payload,
      );
    },
    shiftUpcomingAudioList: (state: any) => {
      state.upcomingAudioList.shift();
    },
    addCurrentlyPlayingAudio: (state: any, action: PayloadAction<any>) => {
      state.currentlyPlayingAudioList.push(action.payload);
    },
    removeCurrentlyPlayingAudioByID: (
      state: any,
      action: PayloadAction<any>,
    ) => {
      state.currentlyPlayingAudioList = state.currentlyPlayingAudioList.filter(
        (x: any) => x.id !== action.payload,
      );
    },
  },
  selectors: {
    selectUpcomingAudioList: (state: any) => state.upcomingAudioList,
    selectCurrentlyPlayingAudioList: (state: any) =>
      state.currentlyPlayingAudioList,
  },
});

export const {
  addUpcomingAudio,
  addCurrentlyPlayingAudio,
  shiftUpcomingAudioList,
  removeCurrentlyPlayingAudioByID,
  removeUpcomingAudioByID,
} = UpcomingSlice.actions;
export const { selectUpcomingAudioList, selectCurrentlyPlayingAudioList } =
  UpcomingSlice.selectors;
export default UpcomingSlice.reducer;
