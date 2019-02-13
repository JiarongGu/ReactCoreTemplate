import { takeLatest, takeEvery } from 'redux-saga/effects';

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
