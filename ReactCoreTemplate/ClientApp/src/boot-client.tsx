import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { configureStore } from '@store';
import { Routes } from './Routes';

// prepare store
const history = createBrowserHistory();
const store = configureStore(history, undefined);

export const App = hot(module)(() => (
  <Routes />
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);