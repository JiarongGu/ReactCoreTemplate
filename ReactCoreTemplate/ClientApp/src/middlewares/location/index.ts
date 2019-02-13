import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { RootState } from '../../store';
import * as Handlers from './handlers';

export const locationMiddleware: any = (store: MiddlewareAPI<RootState>) => (next: Dispatch<RootState>) => (action: AnyAction) => {
  if (action.type == '@@router/LOCATION_CHANGE') {
    locationMiddlewareHandler(store, action.payload);
  }
  return next(action);
};

export const locationMiddlewareHandler: Handlers.LocationMiddlewareHandler = (store, payload) => {
  var handlers = Object.keys(Handlers).map(key => Handlers[key]);
  return Promise.all(handlers.map(handler => handler(store, payload)));
}