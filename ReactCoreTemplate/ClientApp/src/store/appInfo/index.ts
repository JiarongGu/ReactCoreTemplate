import { createReduxEvent, createActionHandler } from '@utils';

export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

const setAppInfo = createReduxEvent({
  action: (appInfo: AppInfoState) => appInfo,
  reducer: (state, { payload: appInfo }) => { return { ...state, ...appInfo }; }
});

export const appInfoReducer = createActionHandler(
  new AppInfoState(), 
  setAppInfo
);

export const appInfoActions = {
  setAppInfo: setAppInfo.action
}
