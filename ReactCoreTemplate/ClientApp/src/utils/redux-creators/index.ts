import { ActionFunctionAny, Action, Reducer } from '..';

export interface IReducerEventParameters<TState, TPayload> {
  name?: string;
  action?: ActionFunctionAny<TPayload>;
  reducer: Reducer<TState, any>;
}

export interface IReducerEvent<TState, TPayload> {
  action: ActionFunctionAny<Action<TPayload>>;
  reducer: Reducer<TState, TPayload>;
}

export type ReducerHandler<TState, TPayload> = (state, payload?: TPayload) => TState;

export * from './combineReducerEvents';
export * from './createReducer';
export * from './reducerRegistry';
export * from './registerReducers';