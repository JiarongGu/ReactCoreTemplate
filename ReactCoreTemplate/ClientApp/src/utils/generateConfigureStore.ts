import { Store, createStore, applyMiddleware, combineReducers, AnyAction, Reducer, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

import { History } from 'history';
import { routerReducer } from 'react-router-redux';

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

    const combinedReducer = buildRootReducer<TRootState>(reducers);
    const store = createStore(combinedReducer as any, initialState as any, middlewares) as Store<TRootState>;

    customActions && customActions(store);
    return store;
  }
}

function buildRootReducer<TRootState>(reducers): Reducer<TRootState> {
  return combineReducers<TRootState>(Object.assign({}, reducers, { routing: routerReducer }));
}