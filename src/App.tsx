import React from 'react';

import Router from './Router';
import './assets/reset.css';
import './assets/style.css';
import BottomNavigator from './components/Footer/BottomNavigator';
import Header from 'components/Header/Header';
import { Loading, Snackbar } from './components/UI';
// import Auth from './Auth';
import { Main } from 'style/GlobalStyle';
import { GlobalDialog, FullScreenDialog } from 'components/UI/index';

const App = () => {
  return (
    <Loading>
      <Header />

      <Main>
        <Router />
      </Main>
      <Snackbar />

      <GlobalDialog />
      <FullScreenDialog />
      <BottomNavigator />
      <div className="mobile_only"></div>
    </Loading>
  );
};

export default App;
