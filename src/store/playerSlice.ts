import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Audio {
  id: string;
  name: string;
  artist: string;
  audioString: string;
  imageString: string;
}

interface PlayerState {
  currentAudioList: Audio[];
}

const initialState: PlayerState = {
  currentAudioList: [],
};

export const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentAudio: (state: any, action: PayloadAction<any>) => {
      state.currentAudioList.push(action.payload);
    },
    removeAudio: (state: any, action: PayloadAction<any>) => {
      const index = state.currentAudioList.findIndex(
        (x: any) => x.id === action.payload,
      );
      if (index !== -1) {
        state.currentAudioList.splice(index, 1);
      }
    },
  },
  selectors: {
    selectCurrentAudio: (state: any) => state.currentAudioList,
  },
});

export const { setCurrentAudio, removeAudio } = PlayerSlice.actions;
export const { selectCurrentAudio } = PlayerSlice.selectors;
export default PlayerSlice.reducer;
