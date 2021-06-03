import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import{SignIn,SignUp,Reset,PostEdit,PostList,PostDetail} from './templates/index';

import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import './assets/reset.css';
// import Auth from "./Auth"
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import './assets/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './assets/theme';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
);

serviceWorker.unregister();
