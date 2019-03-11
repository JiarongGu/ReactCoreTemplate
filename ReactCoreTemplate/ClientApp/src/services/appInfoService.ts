import { service, state, reducer } from '@banbrick/redux-creator';


export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

@service('appInfoService')
export class AppInfoService {
  @state
  state = new AppInfoState();

  @reducer
  setAppInfo(logoUrl: string, isClient: boolean) {
    return { logoUrl, isClient };
  }
}

export const appInfoService = new AppInfoService();