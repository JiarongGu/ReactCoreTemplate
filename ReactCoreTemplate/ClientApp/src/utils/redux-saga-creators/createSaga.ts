import { SagaWatherType, ISagaEvent, ISagaEventParameters, takeEveryWatcher, takeLatestWatcher } from '.';
import { SagaIterator } from 'redux-saga';
import * as uuid from 'uuid';
import { ForkEffect } from 'redux-saga/effects';
import { Action } from '..';

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