import { createReducer, ReduxRegistry } from '@utils';

export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

const setAppInfo = createReducer<AppInfoState, AppInfoState>((state, appInfo) => ({ ...state, appInfo }));

export const appInfoActions = { setAppInfo: setAppInfo.action };

ReduxRegistry.registerReducer({
  stateName: 'appInfo',
  initalState: new AppInfoState(),
  reducerEvents: [setAppInfo]
})