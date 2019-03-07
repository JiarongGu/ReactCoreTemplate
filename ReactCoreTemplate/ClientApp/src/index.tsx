import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Routes } from './components';
import { ApplicationState } from './store';
import '@services';
import { configureStore } from '@banbrick/redux-creator';
import { loadableReady } from 'react-loadable';

declare global {
  interface Window { __PRELOADED_STATE__: any; }
}

// Grab the state from a global variable injected into the server-generated HTML
const initalState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();
const locationChangeAction = 'LOCATION_CHANGE';

const locationMiddleware = {
  actionType: locationChangeAction,
  initalLocation: history.location,
  reload: true
};

const store = configureStore<ApplicationState>({
  initalState,
  locationMiddleware,
  devTool: true
});

// setup location change event
history.listen((location) => {
  store.dispatch({ type: locationChangeAction, payload: location });
});

// fire location event when there is no inital state
if (!initalState)
  store.dispatch({ type: locationChangeAction, payload: history.location });

// hot app module
export const App = hot(module)(() => (
  <Routes />
));

// initalize default state with requests, then render dom
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);