import { createReducer, combineReducers } from '../../utils';

export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

const setAppInfo = createReducer<AppInfoState, AppInfoState>((state, appInfo) => ({ ...state, appInfo }));

export const appInfoReducer = combineReducers( new AppInfoState(), setAppInfo );
export const appInfoActions = { setAppInfo: setAppInfo.action };