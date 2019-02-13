import { createRedux, createReducer } from '../../utils';

export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

const setAppInfo = createRedux<AppInfoState, AppInfoState>((state, appInfo) => ({ ...state, appInfo }));

export const appInfoReducer = createReducer( new AppInfoState(), setAppInfo );
export const appInfoActions = { setAppInfo: setAppInfo.action }