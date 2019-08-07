import { sink, state } from 'redux-sink';


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
}