import React from 'react';
import { Route, Switch } from 'react-router';
import {
  ProductsList,
  PlaceList,
  ProductDetailPage,
  BoxList,
  SignIn,
  Search,
  FavoriteList,
  FavoriteBoxList,
  BoxDetailPage,
  ResetPassword,
  Chat
} from './templates/index';
import Auth from 'Auth';
import { resetPassword } from 'reducks/users/operations';

const Router = () => {
  return (
    <Switch>
      <Route exact={true} path={'/signin'} component={SignIn} />
      <Route exact={true} path={'/reset'} component={ResetPassword} />
      <Auth>
        <Route exact={true} path={'/'} component={ProductsList} />
         <Route exact={true} path={'/chat'} component={Chat} />
        <Route exact={true} path="/place" component={PlaceList} />
        <Route exact={true} path="/product/:id" component={ProductDetailPage} />
        <Route path="/place/:id" component={BoxList} />
        <Route path="/box/:id" component={BoxDetailPage} />
        <Route path="/likes" component={FavoriteList} />
        <Route path="/likesBox" component={FavoriteBoxList} />
        <Route exact path="/search" component={Search} />
      </Auth>
    </Switch>
  );
};

export default Router;
