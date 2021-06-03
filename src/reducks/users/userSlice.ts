import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: '',
      username: '',
      isSignedIn: false,
      avatar: '',
      email: '',
    },
    like: {
      likes: [],
      boxLikes: [],
    },
  },
  reducers: {
    //  actionsに相当する箇所　actionとpayloadが統合している。
    login: (state, action) => {
      state.user = action.payload;
      state.user.isSignedIn = true;
    },
    logout: (state) => {
      state.user = {
        uid: '',
        username: '',
        isSignedIn: false,
        avatar: '',
        email: '',
      };
    },
    updateUserAction: (state, action) => {
      state.user = action.payload;
      state.user.isSignedIn = true;
    },
    fetchPostsInFavoriteAction: (state: any, action: PayloadAction<string[]>) => {
      state.like.likes = [...action.payload];
    },
    fetchBoxesInFavoriteAction: (state: any, action: PayloadAction<string[]>) => {
      state.like.boxLikes = [...action.payload];
    },
  },
});

export const {
  login,
  logout,
  fetchPostsInFavoriteAction,
  updateUserAction,
  fetchBoxesInFavoriteAction,
} = userSlice.actions;
// userの中にuserというオブジェクトが入っている。stateはinitialState,userはname:"user"に該当する。

export const selectUser = (state: RootState) => state.user.user;
export const getUsername = (state: RootState) => state.user.user.username;
export const getUserAvatar = (state: RootState) => state.user.user.avatar;
export const getIsSignedIn = (state: RootState) => state.user.user.isSignedIn;
export const getUserId = (state: RootState) => state.user.user.uid;

export const getProductsInFavorite = (state: RootState) => state.user.like.likes;
export const getBoxesInFavorite = (state: RootState) => state.user.like.boxLikes;

export const getRoute = (state: RootState) => state.router;

export default userSlice.reducer;
