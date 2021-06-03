import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn, getUserId, getProductsInFavorite } from 'reducks/users/userSlice';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchProductsInFavorite } from 'reducks/users/operations';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import HeaderMenus from './HeaderMenus';

const Logo = styled.div`
  margin-top: 3px;
  width: 160px;
  @media (max-width: 600px) {
    width: 140px;
    margin-top: -5px;
  }
  @media (max-width: 340px) {
    width: 110px;
    margin-top: -5px;
  }
`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
  outlined: {
    padding: '0px 5px !important',
    margin: '0px 3px 0px 3px',
    fontWeight: 'bold',
    color: 'white',
    height: '30px',
    fontSize: '0.9rem',
  },
  loginButton: {
    marginLeft: 'auto',
  },
  search: {},
});

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector(getUserId);
  const isSignedIn = useSelector(getIsSignedIn);

  console.log(uid && uid);

  const [open, setOpen] = useState<boolean>(false);
  const likesPost = useSelector(getProductsInFavorite);
  let productInFavorite: string[] = [];

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          {!isSignedIn ? <div className={classes.iconButtons}></div> : <HeaderMenus />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
