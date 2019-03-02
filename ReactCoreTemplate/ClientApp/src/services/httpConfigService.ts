import { AxiosRequestConfig } from 'axios';
import { ReduxCreator } from '@banbrick/redux-creator';

export class HttpConfigState {
  config?: AxiosRequestConfig
}

export const httpConfigActions = new ReduxCreator('httpConfig', new HttpConfigState())
  .addReducer<AxiosRequestConfig | undefined>((state, config) => ({ ...state, config }), 'setHttpConfig')
  .build();