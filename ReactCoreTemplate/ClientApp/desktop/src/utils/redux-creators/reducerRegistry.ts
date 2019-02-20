import * as Redux from 'redux';

const reducerCollection = { }
let staticStore: Redux.Store;
let staticReducers;

export function replaceReducer(name, reducer) {
  if(!reducerCollection[name]) {
    reducerCollection[name] = reducer;
    
    if (staticStore)
      staticStore.replaceReducer(buildReducer())
  }
}

export function registerStore(store: Redux.Store){
  staticStore = store;
}

export function getCurrentStore() {
  return staticStore;
}

export function buildRootReducer<TRootState>(reducers): Redux.Reducer<TRootState> {
  console.log('build store...');
  staticReducers = reducers;
  return buildReducer();
}

function buildReducer<TRootState>(): Redux.Reducer<TRootState> {
  const reducers = Object.assign({},{ ...reducerCollection,  ...staticReducers });
  return Redux.combineReducers<TRootState>(reducers);
}