import React, { useCallback } from 'react';
import { db, FirebaseTimestamp } from 'firebase/index';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToFavorite, addBoxToFavorite } from 'reducks/users/operations';
import { FavoriteStyle, FavoriteCount, FavoriteWrapper } from './style';
import IconButton from '@material-ui/core/IconButton';
import { Likes } from 'types/favorite';
import { getIsSignedIn } from 'reducks/users/userSlice';
import { dialogOpenAction } from 'reducks/dialogSlice';
import { Boxes } from 'types/box';
import { Products } from 'types/products';

interface PROPS {
  id: string;
  uid: string;
  likesProductsArray: string[];
  product?: Products;
  box?: Boxes;
}

const Favorite: React.FC<PROPS> = ({ id, uid, likesProductsArray, product, box }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(getIsSignedIn);
  console.log(id);

  const addToFavorite = useCallback(
    (event: any) => {
      // if (!userproduct) {
      event.stopPropagation();
      const timeStamp = FirebaseTimestamp.now();
      // いいね済みの作品を押した場合削除する
      if (likesProductsArray && likesProductsArray.includes(id)) {
        return db
          .collection('users')
          .doc(uid)
          .collection(box ? 'favoriteBox' : 'favorite')
          .where('favoriteId', '==', id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const dataId = doc.data().likesId;
              return db
                .collection('users')
                .doc(uid)
                .collection(box ? 'favoriteBox' : 'favorite')
                .doc(dataId)
                .delete();
            });
          });
      }
      // いいねしてない商品をデータベースに追加
      dispatch(
        box
          ? box &&
              addBoxToFavorite(
                {
                  added_at: timeStamp,
                  description: box.description,
                  images: box.images,
                  name: box.name,
                  favoriteId: box.id,
                  placeId: box.placeId,
                  stock: box.stock,
                },
                uid
              )
          : product &&
              addProductToFavorite(
                {
                  added_at: timeStamp,
                  description: product.description,
                  images: product.images,
                  name: product.name,
                  favoriteId: product.id,
                },
                uid
              )
      );
      // 投稿に1カウントしていいねしたuidを追加する。
    },
    [likesProductsArray]
  );

  return (
    <div>
      <FavoriteWrapper>
        {isSignedIn && (
          <>
            <IconButton onClick={addToFavorite} style={{ paddingRight: '0' }}>
              <FavoriteStyle
                isActive={likesProductsArray && likesProductsArray.includes(id) && true}
              />
            </IconButton>
          </>
        )}
      </FavoriteWrapper>
    </div>
  );
};

export default Favorite;
