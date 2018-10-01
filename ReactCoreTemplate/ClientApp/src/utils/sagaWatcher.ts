import { takeLatest, takeEvery, SagaIterator } from 'redux-saga';

export const takeLatestWatcher = (action: string, saga : (...args: any[]) => SagaIterator): () => SagaIterator => {
  return function*() {
    while (true) {
      yield* takeLatest(action, saga);
    }
  };
};

export const takeEveryWatcher = (action: string, saga: (...args: any[]) => SagaIterator): () => SagaIterator => {
  return function*() {
    while (true) {
      yield* takeEvery(action, saga);
    }
  };
};
