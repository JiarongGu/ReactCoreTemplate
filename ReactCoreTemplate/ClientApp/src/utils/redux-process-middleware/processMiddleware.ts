import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { PromiseHandler, PromiseHandlerEvent } from '@utils/redux-handler-creators';

const processHandlerMap = new Map<string, PromiseHandler<any>>();

export const processMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  const handler = processHandlerMap.get(action.type);
  if(handler) {
    handler(store, action.payload);
  }
  return next(action);
};

export function registerProcessHandler(handlerEvent: PromiseHandlerEvent<any>) {
  processHandlerMap.set(handlerEvent.action.toString(), handlerEvent.handler);
}