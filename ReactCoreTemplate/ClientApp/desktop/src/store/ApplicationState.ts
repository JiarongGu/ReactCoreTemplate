import { AppInfoState, HttpConfigState } from '../services';

export interface ApplicationState {
  appInfo: AppInfoState;
  httpConfig: HttpConfigState;
}