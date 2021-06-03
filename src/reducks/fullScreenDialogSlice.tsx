import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const fullDialogSlice = createSlice({
  name: 'fullDialog',
  initialState: {
    fullDialog: {
      title: '',
      state: false,
      type: '',
      id: '',
      placeId: '',
      content: [],
    },
  },
  reducers: {
    fullDialogOpenAction: (state, action) => {
      state.fullDialog = action.payload;
      state.fullDialog.state = true;
    },
    fullDialogCloseAction: (state) => {
      state.fullDialog.state = false;
    },
  },
});

export const { fullDialogOpenAction, fullDialogCloseAction } = fullDialogSlice.actions;
export const getFullDialogState = (state: RootState) => state.fullDialog.fullDialog.state;
export const getFullDialogTitle = (state: RootState) => state.fullDialog.fullDialog.title;
export const getFullDialogType = (state: RootState) => state.fullDialog.fullDialog.type;
export const getFullDialogId = (state: RootState) => state.fullDialog.fullDialog.id;
export const getFullDialogPlaceId = (state: RootState) => state.fullDialog.fullDialog.placeId;
export const getFullDialogContent = (state: RootState) => state.fullDialog.fullDialog.content;

export default fullDialogSlice.reducer;
