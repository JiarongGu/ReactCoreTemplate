import { ApplicationState } from './ApplicationState';
import { Store } from 'redux';
import { httpConfigActions } from '../services';
import { AxiosRequestConfig } from 'axios';
import { locationMiddlewareHandler } from '@utils';

export interface PageInfo {
  pathname: string;
}

// initalize store default state based on pathname
export async function initalizeStore(store: Store<ApplicationState>, pageInfo: PageInfo, axiosConfig?: AxiosRequestConfig) {
  store.dispatch(httpConfigActions.setHttpConfig(axiosConfig));
  await locationMiddlewareHandler(store, { pathname: pageInfo.pathname } as any);
}