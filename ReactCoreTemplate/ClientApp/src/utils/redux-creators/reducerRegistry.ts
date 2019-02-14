import * as Redux from 'redux';

const reducerCollection = { }
let staticStore: Redux.Store;
let staticReducers;

export function replaceReducer(name, reducer) {
  if(!reducerCollection[name])
    reducerCollection[name] = reducer;
    
  if (staticStore)
    staticStore.replaceReducer(buildReducer())
}

export function registerStore(store: Redux.Store){
  staticStore = store;
}

export function buildRootReducer<TRootState>(reducers): Redux.Reducer<TRootState> {
  staticReducers = reducers;
  return buildReducer();
}

function buildReducer<TRootState>(): Redux.Reducer<TRootState> {
  return Redux.combineReducers<TRootState>(Object.assign({},{ ...reducerCollection,  ... staticReducers }));
}