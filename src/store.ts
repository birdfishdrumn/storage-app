import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from 'reducks/users/userSlice';
import productReducer from 'reducks/products/productSlice';
import boxReducer from 'reducks/box/boxSlice';
import snackbarReducer from 'reducks/snackbarSlice';
import dialogReducer from 'reducks/dialogSlice';
import fullDialogReducer from 'reducks/fullScreenDialogSlice';
import loadingReducer from 'reducks/loadingSlice';

export const history = createBrowserHistory();
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    box: boxReducer,
    dialog: dialogReducer,
    snackbar: snackbarReducer,
    loading: loadingReducer,
    fullDialog: fullDialogReducer,
    // @ts-ignore

    router: connectRouter(history),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
