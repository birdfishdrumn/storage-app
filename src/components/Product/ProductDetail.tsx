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
  RequiredText,
} from 'style/GlobalStyle';
import BoxProductPlace from './BoxProductPlace';
import { BoxProduct } from 'types/box';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import firebase from 'firebase/app';
import { datetimeToString } from 'functions/function';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';
import { Products } from 'types/products';

interface PROPS {
  dialog?: boolean;
  handleClose?: () => void;
  id: string;
  content: BoxProduct[];
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
  },
  profile: {
    flexFlow: 'row wrap',
    marginBottom: 16,
    background: 'white',
    padding: 16,
    borderRadius: '10px',
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    background: '#eee',
  },
}));

const PostEdit: React.FC<PROPS> = ({ dialog, handleClose, id, content }) => {
  console.log(id);
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const classes = useStyles();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [date, setDate] = useState(FirebaseTimestamp.now());
  const [category, setCategory] = useState<string>('');
  const [placeList, setPlaceList] = useState<string[]>([]);

  // {dateToString(pushItem.date.toDate())}

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
            setDate(data.created_at);
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setCategory(data.category);
            setPlaceList(data.placeList);
          }
        });
    }
  }, []);

  // 投稿を完了する関数

  return (
    <div>
      <SectionContainer>
        <IconButton
          className={classes.button}
          onClick={() =>
            dispatch(fullDialogOpenAction({ title: '商品の編集', type: '商品', id: id }))
          }
        >
          <EditIcon />
        </IconButton>
        <Title>商品の詳細</Title>
        <MinText>{datetimeToString(date?.toDate())}</MinText>
        <div className="module-spacer--medium" />
        <StyledBoldText>商品名</StyledBoldText>
        <BoldText color={'gray'}>{name}</BoldText>
        <div className="module-spacer--medium" />
        <BoldText>メモ</BoldText>
        <BoldText color={'gray'}>{description ? description : 'メモはありません'}</BoldText>
        <div className="module-spacer--medium" />

        <StyledBoldText>カテゴリー</StyledBoldText>
        <BoldText color={'gray'}>{category}</BoldText>

        <div className="module-spacer--medium" />

        <div className="center">
          <StyledBoldText>商品写真</StyledBoldText>
          <div className="module-spacer--medium" />
          <StyledImage width={500} src={images && images[0]?.path} />

          {/* --------作品の写真を投稿する。------------*/}

          <div className="module-spacer--medium" />

          {/* <AddPlace placeList={placeList} setPlaceList={setPlaceList} /> */}

          <BoxProductPlace content={content} />

          <div className="module-spacer--medium" />
          <br />
        </div>
      </SectionContainer>
    </div>
  );
};

export default PostEdit;
