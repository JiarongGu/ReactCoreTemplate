import { appInfoReducer, AppInfoState } from './appInfo';

export const reducers = {
  appInfo: appInfoReducer,
};

export interface ApplicationState {
  appInfo: AppInfoState;
}