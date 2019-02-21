import * as uuid from 'uuid';
import { ReducerHandler, IReducerEvent, IReducerEventParameters } from '.';
import { Reducer, ActionFunction1 } from '..';

export function createReducer<TState, TPayload>(handler: ReducerHandler<TState, TPayload>, name?: string): IReducerEvent<TState, TPayload> 
{
  const reducer = ((state, { payload }) => handler(state, payload)) as Reducer<TState, TPayload>;
  return createComplexReducer<TState, TPayload>({ reducer, name });
}

export function createComplexReducer<TState, TPayload>(event: IReducerEventParameters<TState, TPayload>): IReducerEvent<TState, TPayload> 
{
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