import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db, FirebaseTimestamp } from 'firebase/index';

import { getUsername, getUserId } from 'reducks/users/userSlice';
import {
  SectionContainer,
  Title,
  BoldText,
  StyledBoldText,
  StyledImage,
  MinText,
} from 'style/GlobalStyle';
import BoxProductPlace from './BoxProductPlace';
import { makeStyles } from '@material-ui/core/styles';
import { datetimeToString } from 'functions/function';
import { BoxProduct } from 'types/box';
import UpdateIcon from '@material-ui/icons/Update';
import PlaceIcon from '@material-ui/icons/Place';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    background: '#eee',
  },
}));

interface Categories {
  id: string;
  name: string;
}

interface PROPS {
  handleClose?: () => void;
  id: string;
  content?: BoxProduct[];
}

const PostEdit: React.FC<PROPS> = ({ handleClose, id, content }) => {
  console.log(id);
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const classes = useStyles();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [boxType, setBoxType] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [date, setDate] = useState(FirebaseTimestamp.now());
  const [boxProducts, setBoxProducts] = useState<BoxProduct[]>([]);
  console.log(content);

  // 編集時に以前のデータをセットする。
  useEffect(() => {
    if (id !== '') {
      db.collection('boxes')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data: any = snapshot.data();
          if (data) {
            const tags = data.tags;
            setDate(data.created_at);
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setBoxType(data.boxType);
            setPlace(data.placeId);
            setStock(data.stock);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (id !== '') {
      db.collection('boxes')
        .doc(id)
        .collection('boxProduct')
        .get()
        .then((snapshot) => {
          const list: any = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            list.push(data);
          });
          setBoxProducts(list);
        });
    }
  }, []);

  return (
    <div>
      <SectionContainer>
        <IconButton
          className={classes.button}
          onClick={() =>
            dispatch(
              fullDialogOpenAction({ title: '箱の編集', type: '箱', id: id, placeId: place })
            )
          }
        >
          <EditIcon />
        </IconButton>
        <Title>箱の詳細</Title>
        <MinText>
          <UpdateIcon style={{ marginBottom: '-5px' }} />
          {datetimeToString(date?.toDate())}
        </MinText>
        <MinText>
          <PlaceIcon style={{ marginBottom: '-5px' }} />
          {place}
        </MinText>
        <div className="module-spacer--small" />

        <StyledBoldText>商品名</StyledBoldText>
        <BoldText color={'gray'}>{name}</BoldText>
        <div className="module-spacer--medium" />
        <StyledBoldText>メモ</StyledBoldText>
        <BoldText color={'gray'}>{description}</BoldText>
        <div className="module-spacer--medium" />
        <StyledBoldText>箱の数</StyledBoldText>
        <BoldText color={'gray'}>{stock}</BoldText>
        <div className="module-spacer--medium" />

        <StyledBoldText>カテゴリー</StyledBoldText>
        <BoldText color={'gray'}>{boxType}</BoldText>

        <div className="module-spacer--medium" />

        <div className="module-spacer--medium" />

        <div className="center">
          <StyledBoldText>商品写真</StyledBoldText>
          <div className="module-spacer--medium" />
          <StyledImage width={500} src={images && images[0]?.path} />

          {/* --------作品の写真を投稿する。------------*/}

          <div className="module-spacer--medium" />

          {/* <AddPlace placeList={placeList} setPlaceList={setPlaceList} /> */}

          <BoxProductPlace content={boxProducts} box />

          <div className="module-spacer--medium" />
          <br />
        </div>
      </SectionContainer>
    </div>
  );
};

export default PostEdit;
