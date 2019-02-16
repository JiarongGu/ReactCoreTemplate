import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { PromiseHandlerRegistry, PromiseHandler, PromiseHandlerEvent } from '../redux-handler-creators';
import { getCurrentStore } from '../redux-creators';

const locationHandlerRegistry = new PromiseHandlerRegistry<Location>();
let locationState: Location;

export const locationMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  if (action.type == '@@router/LOCATION_CHANGE') {
    locationMiddlewareHandler(store, action.payload);
  }
  return next(action);
};

export const locationMiddlewareHandler: PromiseHandler<Location> = async (store, payload) => {
  if(!store) return;
  locationState = payload;
  const handlermaps = locationHandlerRegistry.getHandlers();
  const handlers = Object.keys(handlermaps).map(key => handlermaps[key]);
  return Promise.all(handlers.map(handler => handler(store, payload)));
}

export const registerLocationHandler = async (...handlerEvents: PromiseHandlerEvent<Location>[]) => {
  locationHandlerRegistry.registerHandler(...handlerEvents);
  await locationMiddlewareHandler(getCurrentStore(), locationState);
} 