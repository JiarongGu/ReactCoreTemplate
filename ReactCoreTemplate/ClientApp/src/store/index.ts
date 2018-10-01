import { Store, createStore, applyMiddleware, combineReducers, AnyAction, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import { History } from 'history';
import { logger } from './middleware';
import { reducers, ApplicationState } from '@store/reducers';
import { rootSaga } from './sagas';
import { routerReducer, RouterState } from 'react-router-redux';

export { ApplicationState } from './reducers';

export interface RootState extends ApplicationState {
  routing: RouterState;
}

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();
  const connectedRouterMiddleware = routerMiddleware(history);

  let middlewares = applyMiddleware(logger, sagaMiddleware, connectedRouterMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middlewares = composeWithDevTools(middlewares);
  }

  const combinedReducer = buildRootReducer(reducers);
  const store = createStore(combinedReducer as any, initialState as any, middlewares) as Store<RootState>;
  
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

function buildRootReducer(allReducers): Reducer<RootState> {
  return combineReducers<RootState>(Object.assign({}, allReducers, { routing: routerReducer }));
}