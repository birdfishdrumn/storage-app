import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const boxSlice = createSlice({
  name: 'box',
  initialState: {
    box: {
      list: [],
      spacialBox: [],
      place: '',
    },
  },
  reducers: {
    //  actionsに相当する箇所　actionとpayloadが統合している。
    fetchBoxAction: (state: any, action: PayloadAction<string[]>) => {
      state.box.list = [...action.payload];
    },
    fetchSpecialBoxAction: (state: any, action: PayloadAction<any>) => {
      state.box.specialBox = action.payload;
    },
    //  actionsに相当する箇所　actionとpayloadが統合している。

    deleteBoxAction: (state: any, action: PayloadAction<string[]>) => {
      state.box.list = action.payload;
    },
  },
});

export const { fetchBoxAction, deleteBoxAction, fetchSpecialBoxAction } = boxSlice.actions;
// boxの中にboxというオブジェクトが入っている。stateはinitialState,boxはname:"box"に該当する。

export const selectBox = (state: RootState) => state.box;
export const getBoxes = (state: RootState) => state.box.box.list;
export const getSpecialBox = (state: RootState) => state.box.box.spacialBox;

export default boxSlice.reducer;
