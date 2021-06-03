import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import { getUserId, getProductsInFavorite, getBoxesInFavorite } from 'reducks/users/userSlice';
import { fetchProductsInFavorite, fetchBoxesInFavorite } from 'reducks/users/operations';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { db } from 'firebase/index';
import Tooltip from '@material-ui/core/Tooltip';
import { push } from 'connected-react-router';
import HomeIcon from '@material-ui/icons/Home';
import PlaceIcon from '@material-ui/icons/Place';
import { useHistory, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      position: 'absolute',
      overflow: 'auto',
      top: 60,
      // left: 500,
      paddingBottom: 0,
      paddingTop: 0,
      maxHeight: 300,
      cursor: 'pointer',
    },
    searchText: {
      '&:hover': {
        background: '#eee',
      },
    },
    headerMenu: {
      display: 'flex',
    },
    searchField: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      marginRight: 32,
      textAlign: 'center',
      position: 'relative',
      width: 500,
      borderRadius: 20,
      focus: 500,
    },
    popRoot: {
      width: 500,
    },
    typography: {
      padding: theme.spacing(2),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    loginButton: {
      marginLeft: 'auto',
    },
  })
);

const HeaderMenus: React.FC = () => {
  const dispatch = useDispatch();
  const uid = useSelector(getUserId);

  const classes = useStyles();
  const likesPost = useSelector(getProductsInFavorite);
  let productInFavorite: string[] = [];
  let boxInFavorite: string[] = [];

  useEffect(() => {
    const unSub = db
      .collection('users')
      .doc(uid && uid)
      .collection('favorite')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const product: any = change.doc.data();
          // console.log("ii")
          const changeType = change.type;
          switch (changeType) {
            case 'added':
              productInFavorite.push(product);
              break;
            case 'modified':
              const index = productInFavorite.findIndex(
                (product: any) => product.likesId === change.doc.id
              );
              productInFavorite[index] = product;
              break;
            case 'removed':
              productInFavorite = productInFavorite.filter(
                (product: any) => product.likesId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInFavorite(productInFavorite));
      });
    return () => {
      unSub();
    };
  }, []);

  useEffect(() => {
    const unSub = db
      .collection('users')
      .doc(uid && uid)
      .collection('favoriteBox')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const box: any = change.doc.data();
          // console.log("ii")
          const changeType = change.type;
          switch (changeType) {
            case 'added':
              boxInFavorite.push(box);
              break;
            case 'modified':
              const index = boxInFavorite.findIndex((box: any) => box.likesId === change.doc.id);
              boxInFavorite[index] = box;
              break;
            case 'removed':
              boxInFavorite = boxInFavorite.filter((box: any) => box.likesId !== change.doc.id);
              break;
            default:
              break;
          }
        });
        dispatch(fetchBoxesInFavorite(boxInFavorite));
      });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className={classes.headerMenu}>
      <div className={classes.loginButton}>
        <Link to="/">
          <IconButton>
            <HomeIcon style={{ fontSize: '22px' }} />
          </IconButton>
        </Link>
        <Link to="/place">
          <IconButton>
            <PlaceIcon style={{ fontSize: '22px' }} />
          </IconButton>
        </Link>
        <Link to="/likes">
          <IconButton>
            <FavoriteBorderIcon style={{ fontSize: '22px' }} />
          </IconButton>
        </Link>

        <IconButton>
          <SearchIcon style={{ fontSize: '22px' }} onClick={() => dispatch(push('/search'))} />
        </IconButton>
      </div>
    </div>
  );
};

export default HeaderMenus;
