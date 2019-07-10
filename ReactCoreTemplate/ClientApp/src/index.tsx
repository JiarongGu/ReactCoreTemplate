import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Routes } from './components';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { SinkFactory } from 'redux-sink';

declare global {
  interface Window { __PRELOADED_STATE__: any; }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();
const store = SinkFactory.createStore({
  reducers: { router: connectRouter(history) },
  middlewares: [ routerMiddleware(history) ],
  preloadedState,
  devtoolOptions: { devToolCompose: composeWithDevTools }
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
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);