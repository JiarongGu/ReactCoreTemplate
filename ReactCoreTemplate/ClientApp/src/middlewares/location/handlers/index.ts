import { MiddlewareAPI } from 'redux';

export { WatherForecastDataHandler } from './WatherForecastDataHandler';

export type LocationMiddlewareHandler = (store: MiddlewareAPI<any>, payload: any) => Promise<any>;