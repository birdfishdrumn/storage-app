import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, SelectBox, PrimaryButton, ImageCropper } from 'components/UI/index';
import { db } from 'firebase/index';
import { saveProduct } from 'reducks/products/operations';
import { getUsername, getUserId } from 'reducks/users/userSlice';
import { SectionContainer, Title, StyledBoldText, RequiredText } from 'style/GlobalStyle';
import AddPlace from './AddPlace';
import { ProductCategory } from 'types/productCategory';

interface PROPS {
  dialog?: boolean;
  handleClose: () => void;
  id: string;
}

const PostEdit: React.FC<PROPS> = ({ dialog, handleClose, id }) => {
  // let id = dialog ? '' : window.location.pathname.split('/products/edit')[1];

  // if (id) {
  //   id = id.split('/')[1];
  // }
  console.log(id);
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [category, setCategory] = useState<string>('');
  const [placeList, setPlaceList] = useState<string[]>([]);

  const inputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  console.log(categories);

  // 編集時に以前のデータをセットする。
  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data: any = snapshot.data();
          if (data) {
            const tags = data.tags;
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setCategory(data.category);
            setPlaceList(data.placeList);
          }
        });
    }
  }, []);

  // カテゴリー一覧
  useEffect(() => {
    const unSub = db.collection('productCategory').onSnapshot((snapshot: any) => {
      setCategories(
        snapshot.docs.map((doc: any) => ({
          id: doc.data().id,
          name: doc.data().name,
        }))
      );
      return () => {
        unSub();
      };
    });
  }, []);

  // 投稿を完了する関数
  const save = () => {
    dispatch(saveProduct(id, name, description, category, images, placeList));
    handleClose && handleClose();
  };

  return (
    <div>
      <SectionContainer>
        <Title>商品の登録・編集</Title>

        <div className="module-spacer--medium" />

        <StyledBoldText>商品名</StyledBoldText>
        <RequiredText>必須</RequiredText>
        <TextInput
          fullWidth={true}
          label={'12文字まで'}
          multiline={false}
          required={true}
          error={name.length < 12 ? false : true}
          onChange={inputName}
          rows={1}
          value={name}
          type={'text'}
          variant="outlined"
          inputProps={{
            maxLength: 12,
          }}
        />
        <StyledBoldText>メモ</StyledBoldText>
        <RequiredText>必須</RequiredText>
        <TextInput
          fullWidth={true}
          label={'280文字以内'}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={3}
          value={description.slice(0, 280)}
          type={'text'}
          variant="outlined"
        />

        <StyledBoldText>カテゴリー</StyledBoldText>
        <RequiredText>必須</RequiredText>

        <div className="module-spacer--medium" />

        <SelectBox
          label={'カテゴリー'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />

        <div className="module-spacer--medium" />

        <div className="center">
          <StyledBoldText>商品写真</StyledBoldText>
          <RequiredText>必須</RequiredText>

          <div className="module-spacer--medium" />

          <div className="module-spacer--medium" />
          {/* --------作品の写真を投稿する。------------*/}
          <ImageCropper images={images} setImages={setImages} />

          <div className="module-spacer--medium" />

          <AddPlace placeList={placeList} setPlaceList={setPlaceList} />

          <div className="module-spacer--medium" />
          <br />

          <PrimaryButton
            disabled={
              name === ''
              // description === '' ||
              // category === '' ||
              // images.length === 0
            }
            label={'作品を投稿！'}
            onClick={() => save()}
          />
        </div>
      </SectionContainer>
    </div>
  );
};

export default PostEdit;
