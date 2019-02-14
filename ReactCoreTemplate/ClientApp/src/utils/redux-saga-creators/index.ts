import { takeLatest, takeEvery, all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ForkEffect } from 'redux-saga/effects';
import { ActionFunctionAny, Action } from '..';

export enum SagaWatherType {
  Every,
  Lastest
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

export { createComplexSaga, createSaga } from './createSaga';

export function combineSagaWachers(...events: Array<ISagaEvent<any>>) {
  return events.map((event) => event.watcher);
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