import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { PromiseHandler, PromiseHandlerEvent } from '../redux-handler-creators';
import { getCurrentStore } from '../redux-creators/reducerRegistry';

const locationHanlderMap = new Map<string, PromiseHandler<Location>>();
let locationState: Location;

export const locationMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  if (action.type == '@@router/LOCATION_CHANGE') {
    locationMiddlewareHandler(store, action.payload);
  }
  return next(action);
};

export const locationMiddlewareHandler: PromiseHandler<Location> = async (store, payload) => {
  if(!store) return; locationState = payload;

  const handlermaps = Array.from(locationHanlderMap.values());
  return Promise.all(handlermaps.map(handler => handler(store, payload)));
}

export const registerLocationHandler = async (handlerEvent: PromiseHandlerEvent<Location>) => {
  locationHanlderMap.set(handlerEvent.action.toString(), handlerEvent.handler);
  await locationMiddlewareHandler(getCurrentStore(), locationState);
} 