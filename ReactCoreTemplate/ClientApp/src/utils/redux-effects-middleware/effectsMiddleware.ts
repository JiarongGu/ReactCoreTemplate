import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { PromiseHandler, PromiseHandlerEvent } from '@utils/redux-handler-creators';

const effectsHandlerMap = new Map<string, PromiseHandler<any>>();

export const effectsMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  const handler = effectsHandlerMap.get(action.type);
  if(handler) {
    handler(store, action.payload);
  }
  return next(action);
};

export function registerEffectEvent(handlerEvent: PromiseHandlerEvent<any>) {
  effectsHandlerMap.set(handlerEvent.action.toString(), handlerEvent.handler);
}