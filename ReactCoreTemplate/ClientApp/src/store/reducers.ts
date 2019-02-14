import { appInfoReducer, AppInfoState } from './appInfo';
import { httpSourceReducer, HttpSourcesState } from './httpsources';

export const reducers = {
  appInfo: appInfoReducer,
  httpSources: httpSourceReducer,
};

export interface ApplicationState {
  appInfo: AppInfoState;
  httpSources: HttpSourcesState;
}