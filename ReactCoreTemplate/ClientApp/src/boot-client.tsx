import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore, PageInfo } from '@store';
import { Routes } from './Routes';
import { ConnectedRouter } from 'react-router-redux';

// prepare store
const pageInfo: PageInfo = { pathname: document.location ? document.location.pathname : '' }
const history = createBrowserHistory();
const initalState: any = {};
const { store, initTask } = configureStore(history, initalState, pageInfo);

export const App = hot(module)(() => (
  <Routes />
));

// initalize default state with requests, then render dom
initTask.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} store={store}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
})