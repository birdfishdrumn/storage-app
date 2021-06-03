import { AppThunk, RootState, AppDispatch, store } from 'store';
import { fetchBoxAction, deleteBoxAction, fetchSpecialBoxAction } from './boxSlice';
import { db, auth, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';
import { Products } from 'types/products';
import { Boxes } from 'types/box';
import { hideLoadingAction, showLoadingAction } from '../loadingSlice';
import { snackbarOpenAction } from '../snackbarSlice';
import firebase from 'firebase/app';

const BoxesRef = db.collection('boxes');
const timestamp = FirebaseTimestamp.now();

export const fetchBox = (id: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    BoxesRef.doc(id)
      .get()
      .then((snapshot) => {
        const list = [];
        if (snapshot.data()) {
          const data = snapshot.data();
          console.log(data);
          list.push(data);
          dispatch(fetchSpecialBoxAction(list));
        }
      });
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: AppDispatch) => {
    BoxesRef.doc(id).delete();
    // .then(() => {
    //   const prevProducts = store.getState().product.product.list;
    //   // 今回削除した以外の配列を残す
    //   const nextProducts = prevProducts.filter((product:any) => product.id !== id);
    //   dispatch(deleteProductAction(nextProducts));
    // });
  };
};

export const saveBox = (
  id: string,
  name: string,
  description: string,
  state: string,
  images: { [key: string]: string }[],
  stock: number,
  placeId: string,
  selectedValue: string
  // avatar: string,
  // uid: string,
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingAction('作品を登録しています'));
      const timestamp = FirebaseTimestamp.now();
      const data: Boxes = {
        state: state,
        description: description,
        name: name,
        images: images,
        stock: stock,
        placeId: placeId,
        boxType: selectedValue,
        id: id,
        created_at: timestamp,
      };

      if (id === '') {
        const ref = BoxesRef.doc();
        data.created_at = timestamp;
        // 新しく配列を定義してしまうので、constいらない
        id = ref.id;
        data.id = id;
      }
      // 新しく配列を定義してしまうので、constいらない
      BoxesRef.doc(id)
        .set(
          {
            ...data,
            id: id,
          },
          {
            merge: true,
          }
        )
        .then(() => {
          // dispatch(push('/timeline'));
          dispatch(snackbarOpenAction({ text: '商品を登録しました', type: true }));
          dispatch(hideLoadingAction());
        })
        .catch((error) => {
          dispatch(hideLoadingAction());
          dispatch(snackbarOpenAction({ text: '処理に失敗しました', type: false }));
          throw new Error(error);
        });
    } catch (err) {
      dispatch(snackbarOpenAction({ text: '処理に失敗しました', type: false }));
      dispatch(hideLoadingAction());
      throw new Error(err);
    }
  };
};
