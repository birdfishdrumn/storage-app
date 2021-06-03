import React, { useState, useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Favorite from './Favorite/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from 'reducks/users/userSlice';
import {WhiteIcon} from "style/GlobalStyle"
import {Boxes} from "types/box"
import { push } from 'connected-react-router';
import { dialogOpenAction } from 'reducks/dialogSlice';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';
import { datetimeToString } from 'functions/function';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    marginRight: 20,
    height: 106,
    width: 106,
    cursor: 'pointer',
  },
  media: {
    position: 'relative',
  },
  favorite: {
    position: 'absolute',
    bottom: -5,
    right: 30,
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: -5,
      right: -35,
    },
  },
  text: {
    width: '100%',
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface PROPS {
  boxes: Boxes;
  boxArray: string[];
  setBoxArray: React.Dispatch<React.SetStateAction<string[]>>;
  move: boolean;
  deleteBox: boolean;
}

const UserBoxesItem: React.FC<PROPS> = ({ boxes,boxArray,setBoxArray,move,deleteBox }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const name = boxes.name;
  const uid = useSelector(getUserId);
  const image = boxes.images[0].path;
  const id = boxes.id;


  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

    const handleChange = (id: string) => {
    if (boxArray?.includes(id)) {
      setBoxArray((prevState: string[]) =>prevState.filter(prevState=>prevState !== id))
    } else {
         setBoxArray((prevState: string[]) => [...prevState, id])
    }
  }

  return (
    <>
      <ListItem className={classes.list}>
              {(move || deleteBox)  &&
        <IconButton onClick={() => handleChange(id)}>
        {boxArray?.includes(id) ?
          <CheckBoxIcon color="error"/>
          :
        <CheckBoxOutlineBlankIcon/>
        }

      </IconButton>
      }

        <ListItem className={classes.media}>
          <img
            className={classes.image}
            src={image}
            alt="作品画像"
             onClick={() =>
            dispatch(fullDialogOpenAction({ title: '箱の詳細', type: '箱の詳細', id: id }))
          }
          />
        </ListItem>
        <div className={classes.text}>
          <ListItemText primary={name} />
          {datetimeToString(boxes.created_at?.toDate())}
          <Badge badgeContent={boxes?.stock} color="primary">
              <ShoppingCartIcon />
        </Badge>

        </div>
        {/* boxes.likesIdは削除する商品のid */}
        <div className={classes.icon}>
          <WhiteIcon noMargin onClick={() => dispatch(
                fullDialogOpenAction({ title: '箱の編集', type: '箱', id: id, placeId: boxes.placeId })
              )}>
            <EditIcon />
          </WhiteIcon>
          <WhiteIcon
            noMargin
            onClick={() =>
              dispatch(dialogOpenAction({ type: 'delete', title: '商品の削除', id: id }))
            }
          >
            <DeleteIcon />
          </WhiteIcon>
        </div>
      </ListItem>
      <Divider />
    </>
  );
};

export default UserBoxesItem;
