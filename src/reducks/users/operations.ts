import { AppThunk } from 'store';
import firebase from 'firebase/app';
import { User } from 'types/user';
import { db, auth, FirebaseTimestamp } from '../../firebase/index';
import { hideLoadingAction, showLoadingAction } from '../loadingSlice';
import { login, logout, fetchPostsInFavoriteAction, fetchBoxesInFavoriteAction } from './userSlice';
import { push } from 'connected-react-router';
import { snackbarOpenAction } from '../snackbarSlice';

import { dialogCloseAction, dialogOpenAction } from 'reducks/dialogSlice';

export const listenAuthState = (): AppThunk => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = await user.uid;
        const snapshot = await db.collection('users').doc(uid).get();
        const data: any = await snapshot.data();
        // if文がないとエラーが出る
        if (data) {
          dispatch(
            login({
              isSignedIn: true,
              uid: data.uid,
              username: data.username,
              avatar: data.avatar,
              email: data.email,
            })
          );
        }
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

export const signIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    dispatch(showLoadingAction('ログインしています...'));
    if (email === '' || password === '') {
      dispatch(hideLoadingAction());
      alert('必須項目が未入力です。');
      return false;
    }
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        const userState = result.user;
        if (!userState) {
          dispatch(hideLoadingAction());
          alert('パスワードかemailが違います');

          throw new Error('ユーザーIDを取得できません');
        }
        const currentUser = auth.currentUser;
        // E-Mailの確認が取れていない場合は強制サインアウト
        const uid = userState.uid;
        const snapshot = await db.collection('users').doc(uid).get();
        const data = snapshot.data();

        if (!data) {
          dispatch(hideLoadingAction());
          throw new Error('ユーザーデータが存在しません');
        }
        dispatch(
          login({
            role: data.role,
            email: data.email,
            uid: uid,
            username: data.username,
            avatar: data.avatar,
            isSignedIn: true,
          })
        );
        dispatch(dialogCloseAction());
        //

        dispatch(push('/'));

        dispatch(hideLoadingAction());
        dispatch(snackbarOpenAction({ text: 'ログインしました！', type: true }));

        //  signInWithEmailAndPasswordまでの処理
      })
      .catch(() => {
        dispatch(
          snackbarOpenAction({ text: 'パスワードかemailアドレスが違います。', type: false })
        );
        dispatch(hideLoadingAction());
      });
  };
};

export const addProductToFavorite = (addedPost: any, uid: string): AppThunk => {
  return async (getState: any) => {
    const favoriteRef = db.collection('users').doc(uid).collection('favorite').doc();
    addedPost['likesId'] = favoriteRef.id;
    addedPost['uid'] = uid;
    await favoriteRef.set(addedPost);
  };
};

export const addBoxToFavorite = (addedPost: any, uid: string): AppThunk => {
  return async (getState: any) => {
    const favoriteRef = db.collection('users').doc(uid).collection('favoriteBox').doc();
    addedPost['likesId'] = favoriteRef.id;
    addedPost['uid'] = uid;
    await favoriteRef.set(addedPost);
  };
};

export const fetchProductsInFavorite = (products: string[]): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchPostsInFavoriteAction(products));
  };
};

export const fetchBoxesInFavorite = (boxes: string[]): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchBoxesInFavoriteAction(boxes));
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    dispatch(showLoadingAction('メールを送信しています...'));
    if (email === '') {
      dispatch(snackbarOpenAction({ type: false, text: 'メールアドレスの形式が不正です' }));
      dispatch(hideLoadingAction());
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch(hideLoadingAction());
        })
        .catch(() => {
          dispatch(
            snackbarOpenAction({
              type: false,
              text: 'メールの送信に失敗しました。再度時間が経ってからお試しください。',
            })
          );
          dispatch(hideLoadingAction());
        });
    }
  };
};
