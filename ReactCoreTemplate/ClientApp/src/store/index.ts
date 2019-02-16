
import { ApplicationState } from './reducers';
import { AxiosRequestConfig } from 'axios';
import { Store } from 'redux';
import { HttpSources } from '../services/api';
import { getDefualtAxiosConfig } from '../services/helpers';
import { httpSourceActions } from './httpsources';
import { locationMiddlewareHandler } from '@utils';

export interface PageInfo {
  pathname: string;
}

// initalize store default state based on pathname
export async function initalizeStore(store: Store<ApplicationState>, pageInfo: PageInfo, axiosConfig?: AxiosRequestConfig) {
  const httpSources = new HttpSources(getDefualtAxiosConfig('en', axiosConfig));
  store.dispatch(httpSourceActions.setHttpSource(httpSources));
  store.dispatch(httpSourceActions.setDefaultConfig(axiosConfig));

  await locationMiddlewareHandler(store, { pathname: pageInfo.pathname } as any);
}