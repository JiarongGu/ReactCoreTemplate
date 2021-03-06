import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Routes } from './components';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';
import { Router } from 'react-router';
import { createNavigationHistory } from '@services';

declare global {
  interface Window { __PRELOADED_STATE__: any; }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createNavigationHistory();
const store = SinkFactory.createStore({
  preloadedState,
  devToolOptions: { devToolCompose: composeWithDevTools }
});

// const locationChange = (location) => store.dispatch({ type: 'location_change', payload: location });
// history.listen(locationChange);

// if (!preloadedState)
//   locationChange(history.location);

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