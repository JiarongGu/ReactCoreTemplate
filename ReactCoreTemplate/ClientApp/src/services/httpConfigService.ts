import { AxiosRequestConfig } from 'axios';
import { createReducer, ReduxRegistry } from '@utils';

export class HttpConfigState {
  config?: AxiosRequestConfig
}

const setHttpConfig = createReducer<HttpConfigState, AxiosRequestConfig | undefined>((state, config) => ({ ...state, config }));

ReduxRegistry.registerReducer({
  stateName: 'httpConfig',
  initalState: new HttpConfigState(),
  reducerEvents: [setHttpConfig]
})

export const httpConfigActions = {
  setHttpConfig: setHttpConfig.action
}
