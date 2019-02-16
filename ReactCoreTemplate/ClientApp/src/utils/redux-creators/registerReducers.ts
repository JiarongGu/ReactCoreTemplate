import { IReducerEvent, combineReducerEvents } from '.';
import { replaceReducer } from './reducerRegistry';

export interface ReducerRegistration<TState> {
  stateName: string, 
  initalState: TState, 
  reducerEvents: Array<IReducerEvent<TState, any>>
}

export function registerReducers<TState>(registration: ReducerRegistration<TState>) {
  console.log('new state::', registration.stateName);
  var combinedReducer = combineReducerEvents(registration.initalState, ...registration.reducerEvents);
  replaceReducer(registration.stateName, combinedReducer);
}