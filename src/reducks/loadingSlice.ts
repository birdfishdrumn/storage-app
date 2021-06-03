import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: {
      state: false,
      text: '',
    },
  },
  reducers: {
    showLoadingAction: (state, action) => {
      state.loading.text = action.payload;
      state.loading.state = true;
    },
    hideLoadingAction: (state) => {
      state.loading.text = '';
      state.loading.state = false;
    },
  },
});

export const { showLoadingAction, hideLoadingAction } = loadingSlice.actions;
export const getLoadingState = (state: RootState) => state.loading.loading.state;
export const getLoadingText = (state: RootState) => state.loading.loading.text;

export default loadingSlice.reducer;
