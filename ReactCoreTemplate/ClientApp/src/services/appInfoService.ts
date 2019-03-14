import { sink, state, reducer } from 'redux-sink';


export class AppInfoState {
  logoUrl: string;
  isClient: boolean;

  constructor(isClient = true) {
    this.logoUrl = '/media/logo.png';
    this.isClient = isClient;
  }
}

@sink('appInfoService')
export class AppInfoService {
  @state
  state = new AppInfoState();

  @reducer
  setAppInfo(logoUrl: string, isClient: boolean) {
    return { logoUrl, isClient };
  }
}

export const appInfoService = new AppInfoService();