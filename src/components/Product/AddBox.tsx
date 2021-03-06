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

  // ?????????????????????

  // ???????????????????????????
  const save = () => {
    dispatch(saveBox(id, name, description, state, images, stock, placeId, selectedValue));
    handleClose && handleClose();
  };

  return (
    <div>
      <SectionContainer>
        <Title>?????????????????????</Title>

        <div className="module-spacer--medium" />

        <StyledBoldText>????????????</StyledBoldText>
        <RequiredText>??????</RequiredText>
        <TextInput
          fullWidth={true}
          label={'12????????????'}
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
        <BoldText>??????</BoldText>
        <RadioGroupe
          data={boxData}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleChange={handleChange}
        />

        <StyledBoldText>??????</StyledBoldText>
        <TextInput
          fullWidth={true}
          label={'280????????????'}
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
          <StyledBoldText>????????????</StyledBoldText>
          <RequiredText>??????</RequiredText>

          <div className="module-spacer--medium" />

          {/* --------?????????????????????????????????------------*/}
          <ImageCropper images={images} setImages={setImages} />

          <div className="module-spacer--medium" />
          <StyledBoldText>????????????</StyledBoldText>
          <RequiredText>??????</RequiredText>

          <TextInput
            // id={people}
            fullWidth={true}
            label={'?????????'}
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
              <StyledBoldText>????????????</StyledBoldText>

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
            label={'????????????'}
            onClick={() => save()}
          />
        </div>
      </SectionContainer>
    </div>
  );
};

export default AddBox;
