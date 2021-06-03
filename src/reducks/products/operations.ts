import { AppThunk, RootState, AppDispatch, store } from 'store';
import { fetchProductAction, fetchCategoryAction } from './productSlice';
import { db, auth, FirebaseTimestamp } from '../../firebase/index';
import { push } from 'connected-react-router';
import { Products } from 'types/products';
import { Boxes } from 'types/box';
import { hideLoadingAction, showLoadingAction } from '../loadingSlice';
import { snackbarOpenAction } from '../snackbarSlice';

const productsRef = db.collection('products');
const BoxesRef = db.collection('boxes');
const timestamp = FirebaseTimestamp.now();

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  images: { [key: string]: string }[],
  placeList: string[]
  // avatar: string,
  // uid: string,
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(showLoadingAction('作品を登録しています'));
      const timestamp = FirebaseTimestamp.now();
      const data: Products = {
        category: category,
        description: description,
        name: name,
        images: images,
        placeList: placeList,
        created_at: timestamp,
        id: id,
      };

      if (id === '') {
        const ref = productsRef.doc();
        data.created_at = timestamp;
        // 新しく配列を定義してしまうので、constいらない
        id = ref.id;
        data.id = id;
      }
      // 新しく配列を定義してしまうので、constいらない
      productsRef
        .doc(id)
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
//------ユーザーそれぞれが投稿した作品を取得する-------

export const fetchProducts = (id: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoadingAction('Loading...'));
    productsRef
      .where('uid', '==', id)
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const postList: any[] = [];
        snapshots.forEach((snapshot) => {
          const post = snapshot.data();
          postList.push(post);
        });
        dispatch(hideLoadingAction());
        dispatch(fetchProductAction(postList));
      });
  };
};

export const fetchCategory = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const unSub = db.collection('productCategory').onSnapshot((snapshot: any) => {
      const list: any = [];
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        list.push(data);
        console.log(data);
      });
      dispatch(fetchCategoryAction(list));
    });

    return () => {
      unSub();
    };
  };
};

//------自分自身が投稿した作品を取得する。-------
