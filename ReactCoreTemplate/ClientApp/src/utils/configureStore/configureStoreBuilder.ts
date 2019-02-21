import { Store, createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { registerStore, buildRootReducer } from '../redux-creators/reducerRegistry';
import { locationMiddleware } from '../redux-location-middleware';
import { effectsMiddleware } from '../redux-effects-middleware';

export function configureStoreBuilder<TRootState>(reducers, 
    customActions?: (store: Store<TRootState>) => void,
    ...customMiddlewares: Middleware[]
  ) {
  return function (initialState?: TRootState): Store<TRootState> {
    let middlewares = applyMiddleware(...customMiddlewares, locationMiddleware, effectsMiddleware);

    if (process.env.NODE_ENV !== 'production') {
      middlewares = composeWithDevTools(middlewares);
    }

    const combinedReducer = buildRootReducer<TRootState>({ ...reducers });
    const store = createStore(combinedReducer as any, initialState as any, middlewares) as Store<TRootState>;
    registerStore(store);
    customActions && customActions(store);
    return store;
  }
}