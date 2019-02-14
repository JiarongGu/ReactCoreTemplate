import { Store, createStore, applyMiddleware, combineReducers, AnyAction, Reducer, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

import { History } from 'history';
import { routerReducer } from 'react-router-redux';
import { buildRootReducer } from '.';
import { registerStore } from './redux-creators';

export function generateConfigureStore<TRootState>(reducers, 
    customActions?: (store: Store<TRootState>) => void,
    ...customMiddlewares: Middleware[]
  ) {
  return function (history: History, initialState?: TRootState): Store<TRootState> {
    const connectedRouterMiddleware = routerMiddleware(history);
    let middlewares = applyMiddleware(...customMiddlewares, connectedRouterMiddleware);

    if (process.env.NODE_ENV !== 'production') {
      middlewares = composeWithDevTools(middlewares);
    }

    const combinedReducer = buildRootReducer<TRootState>({ ...reducers, routing: routerReducer });
    const store = createStore(combinedReducer as any, initialState as any, middlewares) as Store<TRootState>;
    registerStore(store);
    customActions && customActions(store);
    return store;
  }
}