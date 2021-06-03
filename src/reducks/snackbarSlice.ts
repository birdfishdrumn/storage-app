import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbar: {
      state: false,
      text: '',
      type: false,
    },
  },
  reducers: {
    snackbarOpenAction: (state, action) => {
      state.snackbar = action.payload;
      state.snackbar.state = true;
    },
    snackbarCloseAction: (state) => {
      state.snackbar.text = '';
      state.snackbar.state = false;
    },
  },
});

export const { snackbarOpenAction, snackbarCloseAction } = snackbarSlice.actions;
export const getSnackbarState = (state: RootState) => state.snackbar.snackbar.state;
export const getSnackbarText = (state: RootState) => state.snackbar.snackbar.text;
export const getSnackbarType = (state: RootState) => state.snackbar.snackbar.type;

export default snackbarSlice.reducer;
