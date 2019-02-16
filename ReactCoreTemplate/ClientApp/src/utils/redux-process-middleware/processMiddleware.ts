import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { PromiseHandlerRegistry } from '@utils/redux-handler-creators';

const processHandlerRegistry = new PromiseHandlerRegistry<any>();
export const processMiddleware: any = (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
  const handler = processHandlerRegistry.getHandlers()[action.type];

  if(handler) {
    handler(store, action.payload);
  }
  return next(action);
};

export const registerProcessHandler = processHandlerRegistry.registerHandler;