import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Audio {
  id: string;
  name: string;
  artist: string;
  audioString: string;
  imageString: string;
}

interface PlaylistState {
  playlistAudioList: Audio[];
}

const initialState: PlaylistState = {
  playlistAudioList: [],
};

export const PlaylistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addPlaylistAudio: (state: any, action: PayloadAction<any>) => {
      state.playlistAudioList.push(action.payload);
    },
    removePlaylistAudioByID: (state: any, action: PayloadAction<any>) => {
      const index = state.playlistAudioList.findIndex(
        (x: any) => x.id === action.payload,
      );
      if (index !== -1) {
        state.playlistAudioList.splice(index, 1);
      }
    },
    setPlaylistAudio: (state: any, action: PayloadAction<any>) => {
      state.playlistAudioList = action.payload;
    },
  },
  selectors: {
    selectAllAudio: (state: any) => state.playlistAudioList,
  },
});

export const { addPlaylistAudio, setPlaylistAudio, removePlaylistAudioByID } =
  PlaylistSlice.actions;
export const { selectAllAudio } = PlaylistSlice.selectors;
export default PlaylistSlice.reducer;
