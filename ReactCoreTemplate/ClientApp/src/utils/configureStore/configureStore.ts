import { Store, createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { registerStore, buildRootReducer } from '../redux-creators/reducerRegistry';
import { locationMiddleware } from '../redux-location-middleware';
import { effectsMiddleware } from '../redux-effects-middleware';

export function configureStore<TState>(reducers, initalState, ...customMiddlewares: Middleware[]): Store<TState> {
    let middlewares = applyMiddleware(...customMiddlewares, locationMiddleware, effectsMiddleware);
    if (process.env.NODE_ENV !== 'production') {
      middlewares = composeWithDevTools(middlewares);
    }
    const combinedReducer = buildRootReducer<TState>({ ...reducers });
    const store = createStore(combinedReducer as any, initalState, middlewares) as Store<TState>;
    registerStore(store);
    return store;
}