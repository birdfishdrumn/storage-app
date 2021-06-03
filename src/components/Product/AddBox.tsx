import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  SelectBox,
  PrimaryButton,
  ImageCropper,
  RadioGroupe,
} from 'components/UI/index';
import { db } from 'firebase/index';
import { saveBox } from 'reducks/box/operations';
import { getUsername, getUserId } from 'reducks/users/userSlice';
import { SectionContainer, Title, BoldText, StyledBoldText, RequiredText } from 'style/GlobalStyle';
import SelectProduct from '../UI/SelectProduct';
import AddBoxProduct from './AddBoxProduct';
import { BoxProduct } from 'types/box';
import { boxData } from './data';

interface Categories {
  id: string;
  name: string;
  images: { [key: string]: string }[];
}

interface PROPS {
  dialog?: boolean;
  handleClose: () => void;
  placeId: string;
  id: string;
}

const AddBox: React.FC<PROPS> = ({ dialog, handleClose, placeId, id }) => {
  // let id = dialog ? '' : window.location.pathname.split(`/place/${placeId}`)[1];

  // if (id) {
  //   id = id.split('/')[1];
  // }

  console.log(id);
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [state, setState] = useState<string>('');
  const [selectedValue, setSelectedValue] = React.useState('');
  const [stock, setStock] = useState<number>(0);
  const [boxProductsList, setBoxProductsList] = useState<BoxProduct[]>([]);

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
  const inputStock = useCallback(
    (event) => {
      setStock(event.target.value);
    },
    [setStock]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    },
    [setSelectedValue]
  );

  useEffect(() => {
    if (id !== '') {
      db.collection('boxes')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data: any = snapshot.data();
          if (data) {
            const tags = data.tags;
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setStock(data.stock);
            setSelectedValue(data.boxType);
            // setState(data.state);
          }
        });
    }
  }, []);

  // カテゴリー一覧

  // 投稿を完了する関数
  const save = () => {
    dispatch(saveBox(id, name, description, state, images, stock, placeId, selectedValue));
    handleClose && handleClose();
  };

  return (
    <div>
      <SectionContainer>
        <Title>箱の登録・編集</Title>

        <div className="module-spacer--medium" />

        <StyledBoldText>箱の名前</StyledBoldText>
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
        <BoldText>種類</BoldText>
        <RadioGroupe
          data={boxData}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleChange={handleChange}
        />

        <StyledBoldText>メモ</StyledBoldText>
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

        <div className="module-spacer--medium" />

        <div className="center">
          <StyledBoldText>商品写真</StyledBoldText>
          <RequiredText>必須</RequiredText>

          <div className="module-spacer--medium" />

          {/* --------作品の写真を投稿する。------------*/}
          <ImageCropper images={images} setImages={setImages} />

          <div className="module-spacer--medium" />
          <StyledBoldText>ストック</StyledBoldText>
          <RequiredText>必須</RequiredText>

          <TextInput
            // id={people}
            fullWidth={true}
            label={'在庫数'}
            multiline={false}
            required={true}
            onChange={inputStock}
            rows={1}
            variant="outlined"
            value={stock}
            type={'number'}
            name="stock"
          />

          {id && (
            <>
              <StyledBoldText>中の商品</StyledBoldText>

              <AddBoxProduct
                placeId={placeId}
                name={name}
                boxProductsList={boxProductsList}
                setBoxProductsList={setBoxProductsList}
                id={id}
              />
            </>
          )}

          <div className="module-spacer--medium" />
          <br />

          <PrimaryButton
            disabled={
              name === ''
              // description === '' ||
              // category === '' ||
              // images.length === 0
            }
            label={'箱を登録'}
            onClick={() => save()}
          />
        </div>
      </SectionContainer>
    </div>
  );
};

export default AddBox;
