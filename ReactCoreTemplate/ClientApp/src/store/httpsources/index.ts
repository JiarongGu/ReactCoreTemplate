import { createReducer, combineReducers } from '../../utils';
import { ActionFunction1, Action } from 'redux-actions';
import { HttpSources } from '../../services/api';
import { AxiosRequestConfig } from 'axios';

export interface HttpSourcesState extends HttpSources {
  defualtConfig?: AxiosRequestConfig
}

const setHttpSource = createReducer<HttpSourcesState, HttpSources>((state, newState) => ({ ...state, ...newState })) ;
const setDefaultConfig = createReducer<HttpSourcesState, AxiosRequestConfig | undefined>((state, defualtConfig) => ({ ...state, defualtConfig }));

export const httpSourceReducer = combineReducers(new HttpSources(), setHttpSource, setDefaultConfig);

export const httpSourceActions = {
  setHttpSource: setHttpSource.action as ActionFunction1<HttpSources, Action<HttpSources>>,
  setDefaultConfig: setDefaultConfig.action as ActionFunction1<AxiosRequestConfig | undefined, Action<AxiosRequestConfig | undefined>>
}
