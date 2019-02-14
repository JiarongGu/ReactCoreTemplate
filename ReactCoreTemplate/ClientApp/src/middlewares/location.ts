import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { LocationMiddlewareHandler, getLocationHandlers } from '@utils';

export const locationMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  if (action.type == '@@router/LOCATION_CHANGE') {
    locationMiddlewareHandler(store, action.payload);
  }
  return next(action);
};

export const locationMiddlewareHandler: LocationMiddlewareHandler = (store, payload) => {
  const handlermaps = getLocationHandlers();
  console.log(handlermaps);
  const handlers = Object.keys(handlermaps).map(key => handlermaps[key]);
  return Promise.all(handlers.map(handler => handler(store, payload)));
}