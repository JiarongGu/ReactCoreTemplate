import { takeLatest, takeEvery, all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ForkEffect } from 'redux-saga/effects';
import * as uuid from 'uuid';

export interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
}
export type Reducer<TState, TPayload> = (state: TState, action: Action<TPayload>) => TState;
export type ActionFunction0Base<R> = () => R;
export type ActionFunction1Base<T1, R> = (t1: T1) => R;
export type ActionFunction2Base<T1, T2, R> = (t1: T1, t2: T2) => R;
export type ActionFunction3Base<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type ActionFunction4Base<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

export type ActionFunction1<T1> = ActionFunction1Base<T1, Action<T1>>;
export type ActionFunctionAny<R> = (...args: any[]) => R;

export enum SagaWatherType {
  Every,
  Lastest
}

export interface IReducerEventParameters<TState, TPayload> {
  name?: string;
  action?: ActionFunctionAny<TPayload>;
  reducer: Reducer<TState, any>;
}

export interface IReducerEvent<TState, TPayload> {
  action: ActionFunctionAny<Action<TPayload>>;
  reducer: Reducer<TState, TPayload>;
}

export interface ISagaEventParameters<TPayload> {
  name?: string;
  action?: ActionFunctionAny<TPayload>;
  saga: (action: Action<TPayload>) => SagaIterator;
  type?: SagaWatherType;
}

export interface ISagaEvent<TPayload> {
  action: ActionFunctionAny<Action<TPayload>>;
  watcher: () => IterableIterator<ForkEffect>;
}

type ReducerHandler<TState, TPayload> = (state, payload?: TPayload) => TState;

export function createReducer<TState, TPayload>(
  handler: ReducerHandler<TState, TPayload>
): IReducerEvent<TState, TPayload> {
  const reducer = ((state, { payload }) => handler(state, payload)) as Reducer<TState, TPayload>;
  return createComplexReducer<TState, TPayload>({ reducer });
}

export function createComplexReducer<TState, TPayload>(
  event: IReducerEventParameters<TState, TPayload>
): IReducerEvent<TState, TPayload> {
  const name = event.name || uuid.v4();
  const action = event.action || ((payload: TPayload) => payload);
  
  const createdAction = function(payload) {
    return ({type: name, payload: action(payload)})
  };

  createdAction.toString = () => name;

  const createdReducer = event.reducer;

  return {
    action: createdAction as ActionFunction1<TPayload>,
    reducer: createdReducer
  };
}

export function combineReducers<TState>(
  defaultState: TState,
  ...events: Array<IReducerEvent<TState, any>>
): Reducer<TState, any> {
  const actions = events.reduce((root, next) => {
    return Object.assign(root, { [next.action.toString()]: next.reducer });
  }, {});

  return (state, action) => {
    if(!actions[action.type]) 
      return state || defaultState;

    return actions[action.type](state, action)
  }
}

export function combineSagaWachers(...events: Array<ISagaEvent<any>>) {
  return events.map((event) => event.watcher);
}

export function createSaga<TPayload>(
  saga: (action: Action<TPayload>) => SagaIterator,
  type?: SagaWatherType
): ISagaEvent<TPayload> {
  return createComplexSaga({ saga, type });
}

export function createComplexSaga<TPayload>(
  event: ISagaEventParameters<TPayload>
): ISagaEvent<TPayload> {
  const name = event.name || uuid.v4();
  const action = event.action || ((payload: TPayload) => payload);
  const createdAction = (payload) => ({ type: name, payload: action(payload)});

  let createdWatcher: () => IterableIterator<ForkEffect>;

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

export const takeLatestWatcher = (action, saga) => {
  return function*() {
      yield takeLatest(action, saga);
  };
};

export const takeEveryWatcher = (action, saga)=> {
  return function*() {
      yield takeEvery(action, saga);
  };
};


export const createRootSaga = (...watchers) => {
  const flentedWatchers = watchers.reduce((root, next) => {
    return root.concat(next);
  }, []);

  return function* rootSaga() {
    yield all(flentedWatchers.map(fork));
  }  
}