import { createAction, Reducer, Action, handleActions, ActionFunctionAny } from "redux-actions";
import { takeEveryWatcher, takeLatestWatcher } from './';
import { SagaIterator } from 'redux-saga';
import { ForkEffect } from 'redux-saga/effects';
import * as uuidv4 from 'uuid/v4';

export enum SagaWatherType {
  Every,
  Lastest
}

export interface ReduxEventParameters<TState, TPayload> {
  name?: string;
  action?: ActionFunctionAny<TPayload>;
  reducer: Reducer<TState, any>;
}

export interface ReduxEvent<TState, TPayload> {
  name: string;
  action: ActionFunctionAny<Action<TPayload>>;
  reducer: Reducer<TState, TPayload>;
}

export interface SagaEventParameters<TPayload> {
  name?: string;
  action?: ActionFunctionAny<TPayload>;
  saga: (action: Action<TPayload>) => SagaIterator;
  type?: SagaWatherType
}

export interface SagaEvent<TPayload> {
  action: ActionFunctionAny<Action<TPayload>>;
  watcher: () => IterableIterator<ForkEffect>;
}

type ReducerHandler<TState, TPayload> = (state, payload?: TPayload) => TState;

export function createRedux<TState, TPayload>(handler: ReducerHandler<TState, TPayload>): ReduxEvent<TState, TPayload> {
  const reducer = ((state, { payload }) => handler(state, payload)) as Reducer<TState, TPayload>;
  return createComplexRedux<TState, TPayload>({ reducer });
}

export function createComplexRedux<TState, TPayload>(event: ReduxEventParameters<TState, TPayload>): ReduxEvent<TState, TPayload> {
  const name = event.name || uuidv4();
  const action = event.action || ((payload: TPayload) => payload);
  const createdAction = createAction(name, action);
  const createdReducer = event.reducer;

  return {
    name: name,
    action: createdAction,
    reducer: createdReducer
  }
}

export function createReducer<TState>(defualtState: TState, ...events: ReduxEvent<TState, any>[]): Reducer<TState, any> {
  const actions = events.reduce((root, next) => {
    return Object.assign(root, { [next.name]: next.reducer })
  }, {});

  return handleActions<TState>(
    actions,
    defualtState
  );
}

export function createSagaWatcher(...events: SagaEvent<any>[]) {
  return events.map(event => event.watcher);
}

export function createSaga<TPayload>(saga: (action: Action<TPayload>) => SagaIterator, type?: SagaWatherType): SagaEvent<TPayload> {
  return createComplexSaga({ saga, type });
}

export function createComplexSaga<TPayload>(event: SagaEventParameters<TPayload>): SagaEvent<TPayload> {
  const name = event.name || uuidv4();
  const action = event.action || ((payload: TPayload) => payload);

  const createdAction = createAction(name, action);
  let createdWatcher: () => IterableIterator<ForkEffect> = function* () { };

  if (event.type === SagaWatherType.Every) {
    createdWatcher = takeEveryWatcher(name, event.saga);
  } else {
    createdWatcher = takeLatestWatcher(name, event.saga);
  }

  return {
    action: createdAction,
    watcher: createdWatcher
  };
}