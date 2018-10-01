import { createAction, Reducer, Action, handleActions, ActionFunctionAny } from "redux-actions";
import { takeEveryWatcher, takeLatestWatcher } from './sagaWatcher';
import { SagaIterator } from 'redux-saga';
const uuidv4 = require('uuid/v4');

export enum SagaWatherType {
  Every,
  Lastest
}

export interface ReduxEventProps<TState, TPayload> {
  name?: string;
  action: ActionFunctionAny<TPayload>;
  reducer: Reducer<TState, any>;
}

export interface ReduxEvent<TState, TPayload> {
  name: string;
  action: ActionFunctionAny<Action<TPayload>>;
  reducer: Reducer<TState, TPayload>;
}

export interface SagaEventProps<TPayload> {
  name?: string;
  action: ActionFunctionAny<TPayload>;
  saga: (...args: any[]) => SagaIterator;
  type: SagaWatherType
}

export interface SagaEvent<TPayload> {
  action: ActionFunctionAny<Action<TPayload>>;
  watcher: () => SagaIterator;
}

export function createReduxEvent<TState, TPayload>(event: ReduxEventProps<TState, TPayload>): ReduxEvent<TState, TPayload> {
  const name = event.name || uuidv4();
  const createdAction = createAction(name, event.action);
  const createdReducer = event.reducer;

  return {
    name: name,
    action: createdAction,
    reducer: createdReducer
  }
}

export function createActionHandler<TState>(defualtState: TState, ...actionEvents: ReduxEvent<TState, any>[]): Reducer<TState, any> {
  const actions = actionEvents.reduce((root, next) => {
    return Object.assign(root, { [next.name]: next.reducer })
  }, {});

  return handleActions<TState>(
    actions,
    defualtState
  );
}

export function createSagaEvent<TPayload>(event: SagaEventProps<TPayload>): SagaEvent<TPayload> {
  const name = event.name || uuidv4();
  const createdAction = createAction(name, event.action);
  let createdWatcher: () => SagaIterator = function*(){};
  
  if(event.type === SagaWatherType.Lastest) 
    createdWatcher = takeLatestWatcher(name, event.saga);
  if(event.type === SagaWatherType.Every) 
    createdWatcher = takeEveryWatcher(name, event.saga);
  
  return {
    action: createdAction,
    watcher: createdWatcher
  };
}