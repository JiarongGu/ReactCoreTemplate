
import { RouterState } from 'react-router-redux';
import { generateConfigureStore } from '../utils';
import { ApplicationState, reducers } from './reducers';
import { rootSaga } from './sagas';
import { AxiosRequestConfig } from 'axios';
import { Store } from 'redux';
import { HttpSources } from '../services/api';
import { getDefualtAxiosConfig } from '../services/helpers';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { History } from 'history';
import { locationMiddleware, locationMiddlewareHandler } from '../middlewares';
import { httpSourceActions } from './httpsources';

export interface RootState extends ApplicationState {
  routing: RouterState;
}

export interface PageInfo {
  pathname: string;
}

// configure store with promise initalize task, so page can wait until initalize complete then render page
export function configureStore(history: History, initialState: RootState, pageInfo: PageInfo, axiosConfig?: AxiosRequestConfig) {
  // configure store
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    locationMiddleware, sagaMiddleware
  ];
  const storeAction = generateStoreAction(sagaMiddleware, rootSaga);

  // generate store
  const store = generateConfigureStore<RootState>(reducers, storeAction, ...middlewares)(history, initialState);

  // initalize store
  const initTask = initalizeStore(store, pageInfo, axiosConfig);

  return { store, initTask };
}

function generateStoreAction(sagaMiddleware: SagaMiddleware<{}>, rootSaga) {
  return (store: Store<RootState>) => {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
      });
    }

    sagaMiddleware.run(rootSaga);
  }
}

// initalize store default state based on pathname
function initalizeStore(store: Store<RootState>, pageInfo: PageInfo, axiosConfig?: AxiosRequestConfig) {
  const httpSources = new HttpSources(getDefualtAxiosConfig('en', axiosConfig));
  store.dispatch(httpSourceActions.setHttpSource(httpSources));
  store.dispatch(httpSourceActions.setDefaultConfig(axiosConfig));

  const locationPromise = locationMiddlewareHandler(store, { pathname: pageInfo.pathname });

  return Promise.all([ locationPromise ]);
}