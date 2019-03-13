import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Routes } from './components';
import { ApplicationState } from './store';
import '@services';
import { configureCreatorStore, processLocationTasks } from '@banbrick/redux-creator';

declare global {
  interface Window { __PRELOADED_STATE__: any; }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();

const store = configureCreatorStore<ApplicationState>({
  preloadedState,
  history,
  devTool: true,
});

// fire location tasks when there is no inital state
if (!preloadedState)
  processLocationTasks(store, history.location);

// hot app module
export const App = hot(module)(() => (
  <Routes />
));

// initalize default state with requests, then render dom
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);