import { RootState } from '@store';
import { MiddlewareAPI } from 'redux';

export { SampleDataHandler } from './SampleDataHandler';

export type LocationMiddlewareHandler = (store: MiddlewareAPI<RootState>, payload: any) => Promise<any>;