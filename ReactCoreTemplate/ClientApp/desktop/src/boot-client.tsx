import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Routes } from './Routes';
import { ConnectedRouter, configureStore } from './utils';
import { ApplicationState } from './store';
import '@services';

declare global {
  interface Window { __PRELOADED_STATE__: any; }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();
const store = configureStore<ApplicationState>(undefined, preloadedState);

export const App = hot(module)(() => (
  <Routes />
));

// initalize default state with requests, then render dom
ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history} store={store} dispatchOnMount={!preloadedState} >
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);