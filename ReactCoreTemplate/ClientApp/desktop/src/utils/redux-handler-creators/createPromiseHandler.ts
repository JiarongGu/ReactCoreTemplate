import * as uuid from 'uuid';
import { ActionFunction1 } from '../shared';
import { MiddlewareAPI } from 'redux';

export type PromiseHandler<TPayload> = (store: MiddlewareAPI<any>, payload: TPayload) => Promise<any>;
export type PromiseHandlerEvent<TPayload> = { action: ActionFunction1<TPayload>, handler: PromiseHandler<TPayload> };

export function createPromiseHandler<TPayload>(promisehandler: PromiseHandler<TPayload>, name?: string): PromiseHandlerEvent<TPayload> {
  const hanlderName = name || uuid.v4();
  const createdAction = function (payload) {
    return ({ type: hanlderName, payload: payload });
  };
  createdAction.toString = () => hanlderName;

  return { 
    action: createdAction as ActionFunction1<TPayload>,
    handler: promisehandler
  };
}