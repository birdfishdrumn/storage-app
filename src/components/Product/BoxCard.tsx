import React, { useCallback, memo } from 'react';
import { MinText } from 'style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { Boxes } from 'types/box';
// import NoImage from 'assets/img/src/no_image.png';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';
import { dialogOpenAction } from 'reducks/dialogSlice';
import { getUserId, getIsSignedIn, getBoxesInFavorite } from 'reducks/users/userSlice';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Favorite from './Favorite/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Badge from '@material-ui/core/Badge';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { BoxLikes } from 'types/favorite';

dayjs.locale('ja');

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    display: 'inlineBlock',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
    position: 'relative',
    transition: '0.3s',
    '&:hover': {
      opacity: 0.7,
    },
  },
  title: {
    marginTop: '8px',
  },
  avatar: {
    zIndex: 10,
    position: 'absolute',
    top: 5,
    left: 5,
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    },
  },
  favorite: {
    position: 'absolute',
    top: 3,
    right: 0,
  },
}));

const PostCard: React.FC<Partial<Boxes | BoxLikes>> = memo((props) => {
  const { id, name, boxes, placeId,setBoxArray,boxArray,move,deleteBox } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector(getUserId);
  const isSignedIn = useSelector(getIsSignedIn);
  const date = boxes?.created_at && boxes?.created_at;
  const boxInFavorite: BoxLikes[] = useSelector(getBoxesInFavorite);
  const likesBoxesArray: string[] = boxInFavorite.map((boxes: any) => boxes.favoriteId);

  console.log(likesBoxesArray);
  const images = props.images && props.images;

  const handleChange = (id: string) => {
    if (boxArray?.includes(id)) {
      setBoxArray((prevState: string[]) =>prevState.filter(prevState=>prevState !== id))
    } else {
         setBoxArray((prevState: string[]) => [...prevState, id])
    }
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          // 複数登録した画像のうちの最初のものを選択
          className={classes.media}
          image={images && images[0].path}
          onClick={() =>
            dispatch(fullDialogOpenAction({ title: '箱の詳細', type: '箱の詳細', id: id }))
          }
        >
          <div className={classes.favorite}>
            <Favorite id={id} uid={uid} likesProductsArray={likesBoxesArray} box={boxes} />
          </div>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <UpdateIcon style={{ marginBottom: '-5px' }} />{' '}
            {dayjs(date && date.toDate()).format('YYYY/MM/DD HH:mm')}
            <br />
            <br />
            <PlaceIcon style={{ fontSize: '17px', marginBottom: '-3px' }} />
            {placeId}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={boxes?.stock} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            aria-label="share"
            onClick={() =>
              dispatch(
                fullDialogOpenAction({ title: '箱の編集', type: '箱', id: id, placeId: placeId })
              )
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(dialogOpenAction({ title: '商品の削除', type: 'delete', id: id }))
            }
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      {(move || deleteBox)  &&
        <IconButton onClick={() => handleChange(id)}>
        {boxArray?.includes(id) ?
          <CheckBoxIcon color="error"/>
          :
        <CheckBoxOutlineBlankIcon/>
        }

      </IconButton>
      }

    </div>
  );
});

export default PostCard;
