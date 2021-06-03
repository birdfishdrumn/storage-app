import React, { useCallback, useEffect, useState, memo } from 'react';
import { MinText } from 'style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { Products } from 'types/products';
// import NoImage from 'assets/img/src/no_image.png';
import { getUserId, getProductsInFavorite } from 'reducks/users/userSlice';
import { push } from 'connected-react-router';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';
import Favorite from './Favorite/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import Badge from '@material-ui/core/Badge';
import { db } from 'firebase/index';
import { BoxProduct } from 'types/box';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Likes } from 'types/favorite';
import { useProductStock } from 'fooks/getProductStock';
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

const PostCard: React.FC<Partial<Products | Likes>> = memo((props) => {
  const { id, name, product } = props;
  const { stock, boxProduct, result } = useProductStock(name);
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector(getUserId);
  // const [stock, setStock] = useState<number[]>([]);
  // const [boxProduct, setBoxProduct] = useState<BoxProduct[]>([]);
  const date = product?.created_at && product?.created_at;
  console.log(stock);

  const images = props.images && props.images;
  const productInFavorite: Likes[] = useSelector(getProductsInFavorite);
  const likesProductsArray: string[] = productInFavorite.map((product: any) => product.favoriteId);
  console.log(productInFavorite);

  console.log(boxProduct);

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          // 複数登録した画像のうちの最初のものを選択
          className={classes.media}
          image={images && images[0].path}
          onClick={() =>
            dispatch(
              fullDialogOpenAction({
                title: '商品の詳細',
                type: '詳細',
                id: id,
                content: boxProduct,
              })
            )
          }
        >
          <div className={classes.favorite}>
            <Favorite id={id} uid={uid} likesProductsArray={likesProductsArray} product={product} />
          </div>
          {/* お気に入りリストから取得した場合 */}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <UpdateIcon style={{ marginBottom: '-5px' }} />{' '}
            {dayjs(date && date.toDate()).format('YYYY/MM/DD HH:mm')}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={result} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            aria-label="share"
            onClick={() =>
              dispatch(fullDialogOpenAction({ title: '商品の編集', type: '商品', id: id }))
            }
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>

      <MinText color={'dimgray'} left style={{ margin: '3px' }}></MinText>
    </div>
  );
});

export default PostCard;
