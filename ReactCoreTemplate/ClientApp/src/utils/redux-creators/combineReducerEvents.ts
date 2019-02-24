import { IReducerEvent } from '.';
import { Reducer } from '..';

export function combineReducerEvents<TState>(defaultState: TState, ...events: Array<IReducerEvent<TState, any>>): Reducer<TState, any> 
{
  const actions = events.reduce((root, next) => {
    return Object.assign(root, { [next.action.toString()]: next.reducer });
  }, {});
  return (state, action) => {
    if(!actions[action.type]) 
      return state || defaultState;
    return actions[action.type](state, action)
  }
}