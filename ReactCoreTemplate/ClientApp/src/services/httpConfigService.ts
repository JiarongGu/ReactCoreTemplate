import { AxiosRequestConfig } from 'axios';
import { createReducer, registerReducers } from '@utils';

export class HttpConfigState {
  config?: AxiosRequestConfig
}

const setHttpConfig = createReducer<HttpConfigState, AxiosRequestConfig | undefined>((state, config) => ({ ...state, config }));

registerReducers({
  stateName: 'httpConfig',
  initalState: new HttpConfigState(),
  reducerEvents: [setHttpConfig]
})

export const httpConfigActions = {
  setHttpConfig: setHttpConfig.action
}
