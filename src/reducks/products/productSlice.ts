import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {
      list: [],
      userList: [],
      category: [],
      place: '',
    },
  },
  reducers: {
    //  actionsに相当する箇所　actionとpayloadが統合している。
    fetchProductAction: (state: any, action: PayloadAction<string[]>) => {
      state.product.list = [...action.payload];
    },
    fetchCategoryAction: (state: any, action: PayloadAction<string[]>) => {
      state.product.category = [...action.payload];
    },
    //  actionsに相当する箇所　actionとpayloadが統合している。

    deleteProductAction: (state: any, action: PayloadAction<string[]>) => {
      state.product.list = action.payload;
    },
  },
});

export const {
  fetchProductAction,
  deleteProductAction,
  fetchCategoryAction,
} = productSlice.actions;
// productの中にproductというオブジェクトが入っている。stateはinitialState,productはname:"product"に該当する。

export const selectProduct = (state: RootState) => state.product;
export const getProducts = (state: RootState) => state.product.product.list;
export const getCategory = (state: RootState) => state.product.product.category;

export default productSlice.reducer;
